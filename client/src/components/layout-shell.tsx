import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  CalendarHeart, 
  BookOpen, 
  Phone, 
  UserCircle,
  MessageCircle,
  LogOut,
  Menu,
  // --- NEW ICONS ADDED HERE ---
  Utensils,
  Camera
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reminders", label: "Reminders", icon: CalendarHeart },
  { href: "/journal", label: "Journal", icon: BookOpen },
  
  // --- NEW MENU ITEMS ADDED HERE ---
  { href: "/diet", label: "Diet Plan", icon: Utensils },
  { href: "/baby-moments", label: "Baby Moments", icon: Camera },
  // -------------------------------

  { href: "/contacts", label: "Emergency", icon: Phone },
  { href: "/chat", label: "Ask AI", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border/50">
        <h1 className="text-2xl font-bold text-primary font-display flex items-center gap-2">
          <span className="text-3xl">🤰</span> Pregnancy Care
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <div
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-medium" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 border-r border-border bg-card/30 backdrop-blur-xl sticky top-0 h-screen">
        <NavContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="lg:hidden p-4 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-xl font-bold text-primary font-display">Pregnancy Care</h1>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <NavContent />
            </SheetContent>
          </Sheet>
        </header>
        
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}