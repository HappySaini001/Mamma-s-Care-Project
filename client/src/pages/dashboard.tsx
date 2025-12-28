import { useAuth } from "@/hooks/use-auth";
import { useReminders } from "@/hooks/use-reminders";
import { useProfile } from "@/hooks/use-profile";
import { Link } from "wouter";
import { 
  Bell, 
  Calendar, 
  Phone, 
  MessageSquarePlus, 
  CheckCircle2, 
  Circle,
  HeartPulse
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: reminders } = useReminders();
  const { data: profile } = useProfile();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Mocking pregnancy progress if not set
  const currentWeek = profile?.currentWeek || 12;
  const progressPercent = Math.min((currentWeek / 40) * 100, 100);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
            {greeting()}, {user?.firstName || "Mama"}! 🌸
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Hope you're feeling wonderful today.
          </p>
        </div>
        <div className="flex gap-2">
           <Link href="/contacts">
            <Button variant="destructive" className="shadow-lg shadow-destructive/20 rounded-full px-6">
              <Phone className="mr-2 h-4 w-4" /> SOS
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Progress & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/10 relative overflow-hidden h-full">
             <div className="relative z-10 flex flex-col justify-between h-full">
               <div className="flex justify-between items-start">
                 <div>
                   <h2 className="text-xl font-bold text-primary-foreground/10 text-foreground">Week {currentWeek}</h2>
                   <p className="text-muted-foreground">Trimester {currentWeek < 13 ? 1 : currentWeek < 27 ? 2 : 3}</p>
                 </div>
                 <HeartPulse className="text-primary h-8 w-8 opacity-50" />
               </div>

               <div className="mt-8">
                 <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>Progress</span>
                    <span>{currentWeek} / 40 weeks</span>
                 </div>
                 <div className="h-4 bg-background/50 rounded-full overflow-hidden backdrop-blur-sm">
                   <div 
                     className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                     style={{ width: `${progressPercent}%` }}
                   />
                 </div>
                 <p className="text-sm text-muted-foreground mt-4">
                   Your baby is about the size of a {getFruitSize(currentWeek)}! 🥑
                 </p>
               </div>
             </div>
             
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 h-full flex flex-col justify-center gap-4 border-l-4 border-l-secondary bg-card/50">
             <h3 className="font-semibold text-lg flex items-center gap-2">
               <Calendar className="h-5 w-5 text-secondary-foreground" />
               Quick Actions
             </h3>
             <div className="grid gap-3">
               <Link href="/journal">
                 <Button variant="outline" className="w-full justify-start hover:bg-secondary/20 hover:text-secondary-foreground border-secondary/20">
                   <MessageSquarePlus className="mr-2 h-4 w-4" /> Log Mood
                 </Button>
               </Link>
               <Link href="/reminders">
                 <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:text-primary border-primary/20">
                   <Bell className="mr-2 h-4 w-4" /> Add Reminder
                 </Button>
               </Link>
             </div>
          </Card>
        </motion.div>
      </div>

      {/* Today's Reminders */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-display">Today's Reminders</h2>
          <Link href="/reminders">
            <span className="text-primary hover:underline cursor-pointer text-sm font-medium">View All</span>
          </Link>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reminders?.slice(0, 3).map((reminder) => (
            <div 
              key={reminder.id}
              className="group bg-card hover:bg-accent/30 border border-border/50 p-4 rounded-xl transition-all hover:shadow-md flex items-center gap-4"
            >
              <div className={`
                h-10 w-10 rounded-full flex items-center justify-center shrink-0
                ${reminder.completed ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}
              `}>
                {reminder.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold truncate ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {reminder.title}
                </h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar size={12} /> {reminder.time} • {reminder.type}
                </p>
              </div>
            </div>
          ))}
          {(!reminders || reminders.length === 0) && (
            <div className="col-span-full py-12 text-center bg-card/30 rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground">No reminders for today. Relax! 🧘‍♀️</p>
              <Link href="/reminders">
                <Button variant="link" className="mt-2 text-primary">Add one now</Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function getFruitSize(week: number) {
  if (week < 12) return "Lime";
  if (week < 16) return "Avocado";
  if (week < 20) return "Banana";
  if (week < 24) return "Cantaloupe";
  if (week < 28) return "Eggplant";
  if (week < 32) return "Squash";
  if (week < 36) return "Honeydew";
  return "Watermelon";
}
