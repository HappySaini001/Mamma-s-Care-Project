import { 
  users, reminders, emergencyContacts, journalEntries, medicalProfile, 
  dietPlans, babyMoments, // <--- Added these tables
  type InsertUser, type User, 
  type InsertReminder, type InsertContact, type InsertJournal, type InsertProfile,
  type Reminder, type EmergencyContact, type JournalEntry, type MedicalProfile
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: InsertUser): Promise<User>;
  
  // --- NEW: Update User (for Profile Page) ---
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User>;

  getReminders(userId: string): Promise<Reminder[]>;
  createReminder(reminder: InsertReminder & { userId: number }): Promise<Reminder>;
  updateReminder(id: number, updates: Partial<InsertReminder>): Promise<Reminder>;
  deleteReminder(id: number): Promise<void>;

  getContacts(userId: string): Promise<EmergencyContact[]>;
  createContact(contact: InsertContact & { userId: number }): Promise<EmergencyContact>;
  deleteContact(id: number): Promise<void>;

  getJournalEntries(userId: string): Promise<JournalEntry[]>;
  createJournalEntry(entry: InsertJournal & { userId: number }): Promise<JournalEntry>;

  getProfile(userId: string): Promise<MedicalProfile | undefined>;
  updateProfile(userId: string, profile: InsertProfile): Promise<MedicalProfile>;

  // --- NEW: Diet Plans ---
  getDietPlans(userId: number): Promise<any[]>;
  createDietPlan(plan: any): Promise<any>;

  // --- NEW: Baby Moments ---
  getBabyMoments(userId: number): Promise<any[]>;
  createBabyMoment(moment: any): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [result] = await db.insert(users).values(insertUser);
    const [user] = await db.select().from(users).where(eq(users.id, result.insertId));
    return user;
  }

  async upsertUser(insertUser: InsertUser): Promise<User> {
    const existing = await this.getUserByGoogleId(insertUser.googleId!);
    if (existing) return existing;
    return this.createUser(insertUser);
  }

  // --- FIX: Added this method so you can save Name, Age, Phone, etc. ---
  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    await db.update(users).set(updates).where(eq(users.id, id));
    const [updated] = await db.select().from(users).where(eq(users.id, id));
    return updated;
  }

  async getReminders(userId: string): Promise<Reminder[]> {
    return await db.select().from(reminders).where(eq(reminders.userId, parseInt(userId)));
  }

  async createReminder(reminder: InsertReminder & { userId: number }): Promise<Reminder> {
    const [result] = await db.insert(reminders).values(reminder);
    const [created] = await db.select().from(reminders).where(eq(reminders.id, result.insertId));
    return created;
  }

  async updateReminder(id: number, updates: Partial<InsertReminder>): Promise<Reminder> {
    await db.update(reminders).set(updates).where(eq(reminders.id, id));
    const [updated] = await db.select().from(reminders).where(eq(reminders.id, id));
    return updated;
  }

  async deleteReminder(id: number): Promise<void> {
    await db.delete(reminders).where(eq(reminders.id, id));
  }

  async getContacts(userId: string): Promise<EmergencyContact[]> {
    return await db.select().from(emergencyContacts).where(eq(emergencyContacts.userId, parseInt(userId)));
  }

  async createContact(contact: InsertContact & { userId: number }): Promise<EmergencyContact> {
    const [result] = await db.insert(emergencyContacts).values(contact);
    const [created] = await db.select().from(emergencyContacts).where(eq(emergencyContacts.id, result.insertId));
    return created;
  }

  async deleteContact(id: number): Promise<void> {
    await db.delete(emergencyContacts).where(eq(emergencyContacts.id, id));
  }

  async getJournalEntries(userId: string): Promise<JournalEntry[]> {
    return await db.select().from(journalEntries).where(eq(journalEntries.userId, parseInt(userId)));
  }

  async createJournalEntry(entry: InsertJournal & { userId: number }): Promise<JournalEntry> {
    const [result] = await db.insert(journalEntries).values(entry);
    const [created] = await db.select().from(journalEntries).where(eq(journalEntries.id, result.insertId));
    return created;
  }

  async getProfile(userId: string): Promise<MedicalProfile | undefined> {
    return (await db.select().from(medicalProfile).where(eq(medicalProfile.userId, parseInt(userId))))[0];
  }

  async updateProfile(userId: string, profileData: InsertProfile): Promise<MedicalProfile> {
    const uid = parseInt(userId);
    const existing = await this.getProfile(userId);
    if (existing) {
       await db.update(medicalProfile).set(profileData).where(eq(medicalProfile.userId, uid));
       return (await this.getProfile(userId))!;
    } else {
       const [result] = await db.insert(medicalProfile).values({ ...profileData, userId: uid });
       return (await db.select().from(medicalProfile).where(eq(medicalProfile.id, result.insertId)))[0];
    }
  }

  // --- NEW IMPLEMENTATIONS ---
  async getDietPlans(userId: number): Promise<any[]> {
    return await db.select().from(dietPlans).where(eq(dietPlans.userId, userId));
  }

  async createDietPlan(plan: any): Promise<any> {
    const [result] = await db.insert(dietPlans).values(plan);
    const [newPlan] = await db.select().from(dietPlans).where(eq(dietPlans.id, result.insertId));
    return newPlan;
  }

  async getBabyMoments(userId: number): Promise<any[]> {
    return await db.select().from(babyMoments).where(eq(babyMoments.userId, userId));
  }

  async createBabyMoment(moment: any): Promise<any> {
    const [result] = await db.insert(babyMoments).values(moment);
    const [newMoment] = await db.select().from(babyMoments).where(eq(babyMoments.id, result.insertId));
    return newMoment;
  }
}

export const storage = new DatabaseStorage();