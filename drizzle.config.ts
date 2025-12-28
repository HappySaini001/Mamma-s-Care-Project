import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "mysql", // <--- CHANGED FROM 'postgresql' TO 'mysql'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});