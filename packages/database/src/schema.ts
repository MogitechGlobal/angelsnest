// packages/database/src/schema.ts
import {
  pgTable,
  serial,
  integer,
  text,
  varchar,
  timestamp,
  jsonb,
  numeric,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 50 }).default('+254700000000'),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  roleId: integer('role_id').references(() => roles.id),
  defaultLocation: text('default_location').default('Biashara Street Showroom Pickup'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric('original_price', { precision: 10, scale: 2 }),
  category: varchar('category', { length: 100 }),
  fit: varchar('fit', { length: 100 }),
  badge: varchar('badge', { length: 50 }),
  image: text('image'),
  images: jsonb('images').default([]),
  stock: integer('stock').default(0),
  isActive: boolean('is_active').default(true),
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const customerAddresses = pgTable('customer_addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  recipientName: varchar('recipient_name', { length: 120 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  country: varchar('country', { length: 80 }).default('Kenya').notNull(),
  city: varchar('city', { length: 80 }).notNull(),
  streetAddress: text('street_address').notNull(),
  preferredAgentOrCourier: text('preferred_agent_or_courier'),
  postalCode: varchar('postal_code', { length: 30 }),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const customerOrders = pgTable('customer_orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  orderReference: varchar('order_reference', { length: 30 }).unique().notNull(),
  items: jsonb('items').notNull().default([]),
  subtotal: numeric('subtotal', { precision: 12, scale: 2 }).notNull(),
  shippingFee: numeric('shipping_fee', { precision: 12, scale: 2 }).default('0').notNull(),
  discountAmount: numeric('discount_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  totalAmount: numeric('total_amount', { precision: 12, scale: 2 }).notNull(),
  shippingMethod: text('shipping_method').notNull(),
  paymentMethod: text('payment_method').notNull(),
  status: varchar('status', { length: 40 }).default('Pending Dispatch').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});