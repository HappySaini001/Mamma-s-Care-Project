import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, isAuthenticated } from "./auth";
// REMOVED: import { registerChatRoutes } from "./chat"; 
import { chatRouter } from "./chat"; // <--- Keep this one!

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // 1. Setup Standard Google Auth
  setupAuth(app);

  // 2. Setup AI Chat (Use the new Router)
  app.use(chatRouter); 

  // Helper to get userId
  const getUserId = (req: any) => {
    if (!req.user || !req.user.id) throw new Error("User not found");
    return req.user.id.toString(); 
  };

  // --- Update Personal Details (Name, Age, Phone, Address) ---
  app.patch("/api/user", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(getUserId(req));
      const { displayName, age, phone, address, bloodGroup } = req.body;

      // Update the user in the database
      const updatedUser = await storage.updateUser(userId, {
        displayName,
        age,
        phone,
        address,
        bloodGroup
      });

      res.json(updatedUser);
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // --- Reminders ---
  app.get(api.reminders.list.path, isAuthenticated, async (req, res) => {
    const userId = getUserId(req);
    let reminders = await storage.getReminders(userId);

    // Default Seed Data
    if (reminders.length === 0) {
      const defaults = [
        { type: "hydration", title: "Drink water", time: "09:00", userId },
        { type: "hydration", title: "Drink water", time: "12:00", userId },
        { type: "hydration", title: "Drink water", time: "15:00", userId },
        { type: "hydration", title: "Drink water", time: "18:00", userId },
        { type: "medication", title: "Prenatal Vitamins", time: "08:00", userId },
        { type: "sleep", title: "Prepare for bed", time: "22:00", userId },
      ];
      await Promise.all(defaults.map(r => storage.createReminder(r)));
      reminders = await storage.getReminders(userId);
    }
    res.json(reminders);
  });

  app.post(api.reminders.create.path, isAuthenticated, async (req, res) => {
    try {
      const userId = getUserId(req);
      const input = api.reminders.create.input.parse(req.body);
      const reminder = await storage.createReminder({ ...input, userId });
      res.status(201).json(reminder);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.patch(api.reminders.update.path, isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = api.reminders.update.input.parse(req.body);
      const reminder = await storage.updateReminder(id, input);
      res.json(reminder);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.delete(api.reminders.delete.path, isAuthenticated, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteReminder(id);
    res.status(204).send();
  });

  // --- Contacts ---
  app.get(api.contacts.list.path, isAuthenticated, async (req, res) => {
    const userId = getUserId(req);
    const contacts = await storage.getContacts(userId);
    res.json(contacts);
  });

  app.post(api.contacts.create.path, isAuthenticated, async (req, res) => {
    try {
      const userId = getUserId(req);
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact({ ...input, userId });
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.delete(api.contacts.delete.path, isAuthenticated, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteContact(id);
    res.status(204).send();
  });

  // --- Journal ---
  app.get(api.journal.list.path, isAuthenticated, async (req, res) => {
    const userId = getUserId(req);
    const entries = await storage.getJournalEntries(userId);
    res.json(entries);
  });

  app.post(api.journal.create.path, isAuthenticated, async (req, res) => {
    try {
      const userId = getUserId(req);
      const input = api.journal.create.input.parse(req.body);
      const entry = await storage.createJournalEntry({ ...input, userId });
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // --- Medical Profile (Pregnancy Details) ---
  app.get(api.profile.get.path, isAuthenticated, async (req, res) => {
    const userId = getUserId(req);
    const profile = await storage.getProfile(userId);
    res.json(profile || null);
  });

  app.post(api.profile.update.path, isAuthenticated, async (req, res) => {
    try {
      const userId = getUserId(req);
      const input = api.profile.update.input.parse(req.body);
      const profile = await storage.updateProfile(userId, input);
      res.json(profile);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });
   
  // --- Diet Plans (UPDATED FOR IMAGE UPLOAD) ---
  app.get("/api/diet-plans", isAuthenticated, async (req, res) => {
    const userId = parseInt(getUserId(req));
    const plans = await storage.getDietPlans(userId);
    res.json(plans);
  });

  app.post("/api/diet-plans", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(getUserId(req));
      
      const { doctorName, diagnosis, notes, imageUrl } = req.body;
      
      const mockPlan = `Here is a healthy diet plan based on ${diagnosis}:\n- Breakfast: Oatmeal with fruits\n- Lunch: Grilled chicken salad\n- Dinner: Steamed vegetables with rice.`;
      
      const plan = await storage.createDietPlan({ 
        doctorName, 
        diagnosis, 
        notes, 
        imageUrl, 
        userId, 
        generatedPlan: mockPlan 
      });
      res.status(201).json(plan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create diet plan" });
    }
  });

  // --- Baby Moments ---
  app.get("/api/baby-moments", isAuthenticated, async (req, res) => {
    const userId = parseInt(getUserId(req));
    const moments = await storage.getBabyMoments(userId);
    res.json(moments);
  });

  app.post("/api/baby-moments", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(getUserId(req));
      const input = req.body; 
      const moment = await storage.createBabyMoment({ ...input, userId });
      res.status(201).json(moment);
    } catch (err) {
      res.status(500).json({ message: "Failed to save moment" });
    }
  });

  return httpServer;
}