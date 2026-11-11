import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";

// Points from packages/database to apps/api/.env, falling back to root .env if present
dotenv.config({ path: path.resolve(__dirname, "../../apps/api/.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { 
    url: process.env.DATABASE_URL!,
  },
});