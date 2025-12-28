import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@shared/schema";
import "dotenv/config"; // Ensure env is loaded here too just in case

// Create the connection pool
// FIX: Pass the URL string directly, NOT inside an object with 'uri'
export const pool = mysql.createPool(process.env.DATABASE_URL || "");

export const db = drizzle(pool, { schema, mode: "default" });