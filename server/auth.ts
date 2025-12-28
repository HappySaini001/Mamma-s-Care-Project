import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import { Express, Request, Response, NextFunction } from "express";
import MySQLStore from "express-mysql-session"; // This requires the type install from Step 2
import { pool } from "./db";
import { storage } from "./storage";
import { User } from "@shared/schema";

// Fix type mismatch for session store
const MySQLSessionStore = MySQLStore(session as any);

export function setupAuth(app: Express) {
  const sessionStore = new MySQLSessionStore({}, pool as any);

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await storage.getUserByGoogleId(profile.id);
        if (!user) {
          user = await storage.createUser({
            username: profile.emails?.[0].value || profile.id,
            displayName: profile.displayName,
            googleId: profile.id,
            email: profile.emails?.[0].value,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            profileImageUrl: profile.photos?.[0].value
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  ));

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  
  app.get("/api/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => res.redirect("/dashboard")
  );

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });

  app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) return res.json(req.user);
    res.status(401).send("Not authenticated");
  });
}

// Ensure this is exported!
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  res.status(401).send("Not authenticated");
}