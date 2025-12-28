import { useReminders, useCreateReminder, useDeleteReminder, useUpdateReminder } from "@/hooks/use-reminders";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReminderSchema, type InsertReminder } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, CheckCircle2, Circle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Reminders() {
  const { data: reminders, isLoading } = useReminders();
  const deleteMutation = useDeleteReminder();
  const updateMutation = useUpdateReminder();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const toggleComplete = (reminder: any) => {
    updateMutation.mutate({ 
      id: reminder.id, 
      completed: !reminder.completed 
    }, {
      onSuccess: () => {
        toast({ title: !reminder.completed ? "Great job!" : "Marked as pending" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this reminder?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Daily Reminders</h1>
          <p className="text-muted-foreground">Keep track of your meds, water, and rest.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white px-6">
              <Plus className="mr-2 h-4 w-4" /> New Reminder
            </Button>
          </DialogTrigger>
          <CreateReminderContent onSuccess={() => setIsCreateOpen(false)} />
        </Dialog>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
             {[1,2,3].map(i => <div key={i} className="h-20 bg-muted/20 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {reminders?.map((reminder) => (
              <motion.div
                key={reminder.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className={`
                  p-4 flex items-center gap-4 transition-all duration-300
                  ${reminder.completed ? "bg-muted/30 border-transparent" : "bg-card border-border hover:border-primary/30 hover:shadow-md"}
                `}>
                  <button 
                    onClick={() => toggleComplete(reminder)}
                    className={`
                      h-12 w-12 rounded-full flex items-center justify-center transition-colors
                      ${reminder.completed 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
                    `}
                  >
                    {reminder.completed ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${reminder.completed ? "line-through text-muted-foreground" : ""}`}>
                      {reminder.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {reminder.time}
                      </span>
                      <span className="capitalize px-2 py-0.5 bg-muted rounded-full text-xs">
                        {reminder.type}
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(reminder.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              </motion.div>
            ))}
            {reminders?.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  🧘‍♀️
                </div>
                <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No reminders set. Add one to stay on track.</p>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function CreateReminderContent({ onSuccess }: { onSuccess: () => void }) {
  const createMutation = useCreateReminder();
  const { toast } = useToast();
  
  const form = useForm<Omit<InsertReminder, "userId">>({
    resolver: zodResolver(insertReminderSchema.omit({ userId: true })),
    defaultValues: {
      type: "custom",
      completed: false,
    }
  });

  const onSubmit = (data: Omit<InsertReminder, "userId">) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast({ title: "Reminder created!" });
        onSuccess();
      },
      onError: () => {
        toast({ title: "Failed to create", variant: "destructive" });
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Reminder</DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">What is this for?</label>
          <Input placeholder="Take prenatal vitamins..." {...form.register("title")} />
          {form.formState.errors.title && <p className="text-red-500 text-xs">{form.formState.errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Time</label>
            <Input type="time" {...form.register("time")} />
            {form.formState.errors.time && <p className="text-red-500 text-xs">{form.formState.errors.time.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select onValueChange={(val) => form.setValue("type", val)} defaultValue="custom">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medication">💊 Medication</SelectItem>
                <SelectItem value="hydration">💧 Hydration</SelectItem>
                <SelectItem value="sleep">😴 Sleep</SelectItem>
                <SelectItem value="appointment">🩺 Appointment</SelectItem>
                <SelectItem value="custom">✨ Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes (Optional)</label>
          <Input placeholder="With food..." {...form.register("description")} />
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <Button 
            type="submit" 
            disabled={createMutation.isPending}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {createMutation.isPending ? "Adding..." : "Add Reminder"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
