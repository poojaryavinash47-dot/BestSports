"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Trophy, 
  User, 
  LogIn, 
  Home, 
  Target, 
  Zap, 
  Award,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Cricket", href: "/cricket", icon: Target },
    { label: "Badminton", href: "/badminton", icon: Zap },
    { label: "Membership", href: "/membership", icon: Award },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-secondary p-1.5 rounded-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-foreground">
              PLAY<span className="text-secondary">ARENA</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                    isActive 
                      ? "bg-secondary/10 text-secondary" 
                      : "text-muted-foreground hover:text-secondary hover:bg-secondary/5"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-secondary" : "text-muted-foreground")} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2 font-bold text-secondary">
                <User className="h-4 w-4" />
                DASHBOARD
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="btn-orange rounded-full px-6 font-bold h-10">
                <LogIn className="h-4 w-4 mr-2" />
                LOGIN
              </Button>
            </Link>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b absolute w-full p-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-lg font-bold rounded-xl transition-colors",
                    isActive ? "bg-secondary text-white" : "text-foreground hover:bg-secondary/10"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <hr className="my-2 border-border" />
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-lg font-bold text-secondary">
              <User className="h-5 w-5" /> Dashboard
            </Link>
            <Link href="/auth" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-lg font-bold text-primary">
              <LogIn className="h-5 w-5" /> Login / Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
