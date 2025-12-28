import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Flower2, Heart, ShieldCheck } from "lucide-react";
import { SiGoogle } from "react-icons/si"; // Make sure to install react-icons if missing, or remove this icon

export default function AuthLanding() {
  const handleLogin = () => {
    // OLD: window.location.href = "/api/login";
    // NEW: Point to the Google Auth route we created in server/auth.ts
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 bg-white rounded-full shadow-xl shadow-pink-100"
        >
          <Flower2 className="w-16 h-16 text-primary animate-pulse-slow" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold font-display text-gray-900 mb-6"
        >
          Your Personal <span className="text-primary">Pregnancy Companion</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed"
        >
          A safe, caring space for your journey to motherhood. Track your health, mood, and reminders all in one place.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            size="lg" 
            onClick={handleLogin}
            className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
          >
            {/* Simple text if you don't have the icon package yet */}
            <span>Sign in with Google</span>
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-20 text-left"
        >
          {[
            { icon: Heart, title: "Health Tracking", desc: "Monitor your vitals and baby's growth week by week." },
            { icon: ShieldCheck, title: "Safety First", desc: "One-tap SOS alerts for peace of mind." },
            { icon: Flower2, title: "Emotional Care", desc: "Daily affirmations and mood journaling." }
          ].map((item, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm">
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>

      </main>

      <footer className="p-6 text-center text-gray-400 text-sm">
        © 2024 Pregnancy Care. Made with love.
      </footer>
    </div>
  );
}