import { useJournalEntries, useCreateJournalEntry } from "@/hooks/use-journal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJournalSchema, type InsertJournal } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Smile, Frown, Meh, Sun, CloudRain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { value: 'happy', icon: Smile, color: 'text-green-500', bg: 'bg-green-50', label: "Happy" },
  { value: 'calm', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-50', label: "Calm" },
  { value: 'tired', icon: CloudRain, color: 'text-blue-400', bg: 'bg-blue-50', label: "Tired" },
  { value: 'stressed', icon: Meh, color: 'text-orange-500', bg: 'bg-orange-50', label: "Stressed" },
  { value: 'sad', icon: Frown, color: 'text-gray-500', bg: 'bg-gray-50', label: "Sad" },
];

export default function Journal() {
  const { data: entries, isLoading } = useJournalEntries();
  const createMutation = useCreateJournalEntry();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const form = useForm<Omit<InsertJournal, "userId">>({
    resolver: zodResolver(insertJournalSchema.omit({ userId: true })),
  });

  const onSubmit = (data: Omit<InsertJournal, "userId">) => {
    if (!selectedMood) {
      toast({ title: "Please select a mood", variant: "destructive" });
      return;
    }
    
    createMutation.mutate({ ...data, mood: selectedMood }, {
      onSuccess: () => {
        toast({ title: "Journal entry saved 📔" });
        form.reset();
        setSelectedMood(null);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold font-display mb-4">How are you feeling?</h2>
          
          <Card className="p-6 border-none shadow-lg bg-gradient-to-br from-white to-primary/5">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-5 gap-2">
                {moods.map((m) => {
                  const Icon = m.icon;
                  const isSelected = selectedMood === m.value;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setSelectedMood(m.value)}
                      className={`
                        flex flex-col items-center gap-1 p-2 rounded-xl transition-all
                        ${isSelected ? `${m.bg} ring-2 ring-primary ring-offset-2 scale-110` : 'hover:bg-muted'}
                      `}
                    >
                      <Icon className={`h-8 w-8 ${isSelected ? m.color : 'text-muted-foreground'}`} />
                      <span className="text-[10px] font-medium text-muted-foreground">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Notes</label>
                <Textarea 
                  placeholder="Today I felt..." 
                  className="min-h-[150px] resize-none bg-background/50 focus:bg-background transition-colors"
                  {...form.register("content")}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-full bg-primary hover:bg-primary/90"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Saving..." : "Save Entry"}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Timeline Column */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold font-display">Your Journal</h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-muted/20 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {entries?.map((entry) => {
              const mood = moods.find(m => m.value === entry.mood);
              const Icon = mood?.icon || Smile;
              
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="p-6 hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm border-border/50">
                    <div className="flex gap-4 items-start">
                      <div className={`p-3 rounded-full shrink-0 ${mood?.bg || 'bg-gray-100'}`}>
                        <Icon className={`h-6 w-6 ${mood?.color || 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold capitalize text-lg">{entry.mood}</h3>
                          <span className="text-xs text-muted-foreground">
                            {entry.createdAt && format(new Date(entry.createdAt), "MMM d, yyyy • h:mm a")}
                          </span>
                        </div>
                        <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {entry.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
            {entries?.length === 0 && (
              <div className="text-center py-20 bg-muted/10 rounded-2xl border border-dashed">
                <p className="text-muted-foreground">No entries yet. Start writing your journey! ✍️</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
