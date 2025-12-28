import { mysqlTable, text, int, boolean, timestamp, varchar, serial } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export * from "./models/auth";
export * from "./models/chat";

// --- NEW TABLES ---
export const dietPlans = mysqlTable("diet_plans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  doctorName: varchar("doctor_name", { length: 255 }).notNull(),
  diagnosis: text("diagnosis"),
  notes: text("notes"),
  generatedPlan: text("generated_plan"),
  
  // --- NEW COLUMN FOR CAMERA PHOTO ---
  imageUrl: text("image_url"), 
  
  createdAt: timestamp("created_at").defaultNow(),
});


export const babyMoments = mysqlTable("baby_moments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  photoUrl: text("photo_url"),
  date: timestamp("date").defaultNow(),
});

// --- Users Table (Updated with Personal Info) ---
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  googleId: varchar("google_id", { length: 255 }).unique(),
  username: varchar("username", { length: 255 }).notNull(),
  displayName: text("display_name"),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  
  // --- NEW FIELDS YOU ASKED FOR ---
  age: varchar("age", { length: 10 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  bloodGroup: varchar("blood_group", { length: 5 }), // Added this too just in case
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const reminders = mysqlTable("reminders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  time: varchar("time", { length: 10 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
});

export const emergencyContacts = mysqlTable("emergency_contacts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  relation: text("relation").notNull(),
});

export const journalEntries = mysqlTable("journal_entries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  mood: varchar("mood", { length: 50 }).notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

// This table already handles Pregnancy Details!
export const medicalProfile = mysqlTable("medical_profile", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().unique(),
  dueDate: timestamp("due_date"),
  currentWeek: int("current_week"),
  doctorName: text("doctor_name"),
  hospitalName: text("hospital_name"),
  hospitalAddress: text("hospital_address"),
  bloodType: varchar("blood_type", { length: 10 }),
});

// --- Insert Schemas ---
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const insertReminderSchema = createInsertSchema(reminders).omit({ id: true, userId: true });
export type InsertReminder = z.infer<typeof insertReminderSchema>;

export const insertContactSchema = createInsertSchema(emergencyContacts).omit({ id: true, userId: true });
export type InsertContact = z.infer<typeof insertContactSchema>;

export const insertJournalSchema = createInsertSchema(journalEntries).omit({ id: true, userId: true, createdAt: true });
export type InsertJournal = z.infer<typeof insertJournalSchema>;

export const insertProfileSchema = createInsertSchema(medicalProfile).omit({ id: true, userId: true });
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Reminder = typeof reminders.$inferSelect;
export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type JournalEntry = typeof journalEntries.$inferSelect;
export type MedicalProfile = typeof medicalProfile.$inferSelect;
export const insertDietSchema = createInsertSchema(dietPlans).omit({ id: true, userId: true, createdAt: true });
export type InsertDiet = z.infer<typeof insertDietSchema>;

export const insertMomentSchema = createInsertSchema(babyMoments).omit({ id: true, userId: true, date: true });
export type InsertMoment = z.infer<typeof insertMomentSchema>;