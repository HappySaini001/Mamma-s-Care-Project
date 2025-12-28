import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { LayoutShell } from "@/components/layout-shell";
import { Loader2 } from "lucide-react";

import NotFound from "@/pages/not-found";
import AuthLanding from "@/pages/auth-landing";
import Dashboard from "@/pages/dashboard";
import Reminders from "@/pages/reminders";
import Contacts from "@/pages/contacts";
import Journal from "@/pages/journal";
import Profile from "@/pages/profile";
import Chat from "@/pages/chat";

// --- NEW IMPORTS ADDED HERE ---
import DietPage from "@/pages/diet-page";
import BabyMomentsPage from "@/pages/baby-moments";

function ProtectedRouter() {
  return (
    <LayoutShell>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/reminders" component={Reminders} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/journal" component={Journal} />
        <Route path="/profile" component={Profile} />
        <Route path="/chat" component={Chat} />

        {/* --- NEW ROUTES --- */}
        <Route path="/diet" component={DietPage} />
        <Route path="/baby-moments" component={BabyMomentsPage} />
        
        <Route component={NotFound} />
      </Switch>
    </LayoutShell>
  );
}

function MainContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center space-y-4">
           <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
           <p className="text-muted-foreground animate-pulse">Loading your care space...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthLanding />;
  }

  return <ProtectedRouter />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MainContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;