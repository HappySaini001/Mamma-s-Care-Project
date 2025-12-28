import "dotenv/config"; // <--- THIS MUST BE FIRST
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { createServer } from "http";
import path from "path";

import cron from 'node-cron';

// This runs every day at 10:45 PM (22:45)
cron.schedule('45 22 * * *', () => {
  console.log('--- TRIGGERING MAMA CARE ALERT ---');
  
  // Code to send the notification to your phone goes here
  sendNotificationToUser("Time for your water! 💧");
});

function sendNotificationToUser(msg: string) {
    // In a real app, this connects to Firebase or OneSignal
    console.log(`Notification Sent: ${msg}`);
}
const app = express();
const httpServer = createServer(app);
// ... (rest of your code is fine)

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  console.error(err);
});

(async () => {
  // 1. Register API Routes
  await registerRoutes(httpServer, app);

  // 2. Serve Frontend
  if (process.env.NODE_ENV === "production") {
    // In production (Google Cloud), serve the built files from 'dist/public'
    const publicDir = path.join(__dirname, "..", "public");
    app.use(express.static(publicDir));
    
    app.get("*", (_req, res) => {
      res.sendFile(path.join(publicDir, "index.html"));
    });
  } else {
    // In development (NetBeans), use Vite
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // 3. Start Server
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, "0.0.0.0", () => {
    console.log(`Server serving on port ${port}`);
  });
})();