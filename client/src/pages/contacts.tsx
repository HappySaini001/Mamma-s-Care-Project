import { useContacts, useCreateContact, useDeleteContact } from "@/hooks/use-contacts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Phone, User, Trash2, Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Contacts() {
  const { data: contacts, isLoading } = useContacts();
  const deleteMutation = useDeleteContact();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { toast } = useToast();

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDelete = (id: number) => {
    if (confirm("Remove this emergency contact?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast({ title: "Contact removed" })
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-display text-destructive">Emergency Contacts</h1>
        <p className="text-muted-foreground">People to notify in case of an emergency.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Emergency Button - Always present */}
        <Card className="p-8 flex flex-col items-center justify-center gap-4 bg-destructive/5 border-destructive/20 hover:bg-destructive/10 transition-colors text-center shadow-lg cursor-pointer group" onClick={() => handleCall("911")}>
          <div className="h-20 w-20 bg-destructive rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
            <Phone size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-destructive">Call Emergency Services</h2>
            <p className="text-destructive/80">Tap to dial 911 immediately</p>
          </div>
        </Card>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Card className="p-8 flex flex-col items-center justify-center gap-4 border-dashed border-2 hover:border-primary/50 cursor-pointer bg-transparent hover:bg-primary/5 transition-all group">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Plus size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-center">Add Personal Contact</h3>
                <p className="text-sm text-muted-foreground text-center">Partner, Doctor, or Family</p>
              </div>
            </Card>
          </DialogTrigger>
          <CreateContactContent onSuccess={() => setIsCreateOpen(false)} />
        </Dialog>
      </div>

      <div className="space-y-4 pt-8">
        <h2 className="text-xl font-semibold px-2">Your Contacts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {isLoading && [1, 2].map(i => <div key={i} className="h-24 bg-muted/20 rounded-xl animate-pulse" />)}
          
          {contacts?.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <User size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{contact.name}</h3>
                <p className="text-sm text-muted-foreground capitalize flex items-center gap-2">
                  <Heart size={12} className="text-red-400" /> {contact.relation}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => handleCall(contact.phone)} className="rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
                  <Phone size={18} />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(contact.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 size={18} />
                </Button>
              </div>
            </motion.div>
          ))}
          {contacts?.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-8">No personal contacts added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function CreateContactContent({ onSuccess }: { onSuccess: () => void }) {
  const createMutation = useCreateContact();
  const { toast } = useToast();
  
  const form = useForm<Omit<InsertContact, "userId">>({
    resolver: zodResolver(insertContactSchema.omit({ userId: true })),
  });

  const onSubmit = (data: Omit<InsertContact, "userId">) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast({ title: "Contact added" });
        onSuccess();
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Emergency Contact</DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input placeholder="John Doe" {...form.register("name")} />
          {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Relation</label>
            <Input placeholder="Partner" {...form.register("relation")} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input placeholder="555-0123" {...form.register("phone")} />
            {form.formState.errors.phone && <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>}
          </div>
        </div>

        <Button type="submit" className="w-full mt-4 bg-primary hover:bg-primary/90" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Adding..." : "Save Contact"}
        </Button>
      </form>
    </DialogContent>
  );
}
