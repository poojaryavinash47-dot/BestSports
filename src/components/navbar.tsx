"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  LogIn, 
  Home, 
  Target, 
  Zap, 
  Award
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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Stylized Logo Shield */}
                <svg viewBox="0 0 100 100" className="w-full h-full fill-secondary group-hover:scale-105 transition-transform duration-300">
                  <path d="M50 5 L10 25 L10 50 C10 75 50 95 50 95 C50 95 90 75 90 50 L90 25 L50 5 Z" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white pb-1">
                  <span className="text-[14px] font-black leading-none">B</span>
                  <div className="w-6 h-[1px] bg-primary my-0.5"></div>
                  <span className="text-[6px] font-bold tracking-tighter">EST 2025</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xl font-black leading-none tracking-tighter text-foreground uppercase italic">
                  BEST SHOT
                </span>
                <span className="font-headline text-xs font-bold leading-none tracking-[0.2em] text-primary uppercase">
                  CRICKET
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-black rounded-full transition-all duration-300 uppercase italic tracking-tighter",
                    isActive 
                      ? "bg-secondary text-white" 
                      : "text-muted-foreground hover:text-secondary hover:bg-secondary/5"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground")} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2 font-black text-secondary italic tracking-tighter">
                <User className="h-4 w-4" />
                DASHBOARD
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="btn-orange rounded-xl px-6 font-black h-11 italic tracking-tighter uppercase">
                <LogIn className="h-4 w-4 mr-2" />
                LOGIN
              </Button>
            </Link>
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b absolute w-full p-4 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-3 px-4 py-4 text-lg font-black rounded-xl transition-colors italic uppercase tracking-tighter",
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
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-4 text-lg font-black text-secondary italic uppercase tracking-tighter">
              <User className="h-5 w-5" /> Dashboard
            </Link>
            <Link href="/auth" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-4 text-lg font-black text-primary italic uppercase tracking-tighter">
              <LogIn className="h-5 w-5" /> Login / Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
