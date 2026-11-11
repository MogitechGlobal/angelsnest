// apps/api/src/routes/auth.ts
import { Router, type Router as IRouter, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq, desc } from 'drizzle-orm';
import { db, users, customerAddresses, customerOrders } from '@angelsnest/database';
import { authMiddleware, type AuthRequest } from '../middleware/auth.js';

export const authRouter: IRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-env';

// Helper to generate a 30-day JWT token
function generateToken(user: { id: number; email: string; name: string }): string {
  return jwt.sign(
    { sub: String(user.id), email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

/**
 * POST /api/auth/register
 * Creates a new customer account
 */
authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, password, defaultLocation } = req.body;

    if (!name || !email || !phone || !password) {
      res.status(400).json({ error: 'Please provide all required fields (name, email, phone, password).' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, cleanEmail))
      .limit(1);

    if (existingUser) {
      res.status(409).json({ error: 'An account with this email address already exists.' });
      return;
    }

    // Hash password & insert into Neon database
    const passwordHash = await bcrypt.hash(password, 10);
    const [newUser] = await db
      .insert(users)
      .values({
        name: name.trim(),
        email: cleanEmail,
        phone: phone.trim(),
        passwordHash,
        defaultLocation: defaultLocation?.trim() || 'Biashara Street Showroom Pickup',
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        defaultLocation: users.defaultLocation,
      });

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'Account created successfully',
      user: newUser,
      token,
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error during registration.' });
  }
});

/**
 * POST /api/auth/login
 * Validates credentials and returns JWT session
 */
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, cleanEmail))
      .limit(1);

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        defaultLocation: user.defaultLocation,
      },
      token,
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error during login.' });
  }
});

/**
 * GET /api/auth/me
 * Retrieves current authenticated profile, saved addresses, and past orders
 */
authRouter.get('/me', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.sub || req.user?.userId);

    if (!userId || isNaN(userId)) {
      res.status(401).json({ error: 'Invalid or missing user ID in token.' });
      return;
    }

    // Query user profile
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        defaultLocation: users.defaultLocation,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      res.status(404).json({ error: 'User profile not found.' });
      return;
    }

    // Query saved customer delivery locations
    const addresses = await db
      .select()
      .from(customerAddresses)
      .where(eq(customerAddresses.userId, userId))
      .orderBy(desc(customerAddresses.createdAt));

    // Query historical orders
    const orders = await db
      .select()
      .from(customerOrders)
      .where(eq(customerOrders.userId, userId))
      .orderBy(desc(customerOrders.createdAt));

    res.status(200).json({
      user,
      addresses,
      orders,
    });
  } catch (error: any) {
    console.error('Fetch Profile Error:', error);
    res.status(500).json({ error: error.message || 'Failed to retrieve account details.' });
  }
});

/**
 * PUT /api/auth/me
 * Updates personal details and preferred location
 */
authRouter.put('/me', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.sub || req.user?.userId);
    const { name, phone, defaultLocation } = req.body;

    const [updatedUser] = await db
      .update(users)
      .set({
        ...(name ? { name: name.trim() } : {}),
        ...(phone ? { phone: phone.trim() } : {}),
        ...(defaultLocation ? { defaultLocation: defaultLocation.trim() } : {}),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        defaultLocation: users.defaultLocation,
      });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ error: error.message || 'Failed to update profile.' });
  }
});

/**
 * POST /api/auth/addresses
 * Saves a new delivery location or Pick Up Mtaani agent
 */
authRouter.post('/addresses', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.sub || req.user?.userId);
    const { recipientName, phone, country, city, streetAddress, preferredAgent, postalCode } = req.body;

    if (!recipientName || !phone || !city || !streetAddress) {
      res.status(400).json({ error: 'Please provide recipient name, phone, city, and street address.' });
      return;
    }

    const [newAddress] = await db
      .insert(customerAddresses)
      .values({
        userId,
        recipientName: recipientName.trim(),
        phone: phone.trim(),
        country: country?.trim() || 'Kenya',
        city: city.trim(),
        streetAddress: streetAddress.trim(),
        preferredAgentOrCourier: preferredAgent?.trim() || null,
        postalCode: postalCode?.trim() || null,
      })
      .returning();

    res.status(201).json({
      message: 'Delivery address added successfully',
      address: newAddress,
    });
  } catch (error: any) {
    console.error('Create Address Error:', error);
    res.status(500).json({ error: error.message || 'Failed to save address.' });
  }
});