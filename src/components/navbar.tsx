
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Trophy, User, LogIn } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-foreground">
              PLAY<span className="text-primary">ARENA</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/cricket" className="text-sm font-medium hover:text-primary transition-colors">Cricket</Link>
            <Link href="/badminton" className="text-sm font-medium hover:text-primary transition-colors">Badminton</Link>
            <Link href="/membership" className="text-sm font-medium hover:text-primary transition-colors">Membership</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="bg-primary text-primary-foreground font-bold neon-glow-blue">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card absolute w-full p-4 border-b">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/cricket" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Cricket</Link>
            <Link href="/badminton" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Badminton</Link>
            <Link href="/membership" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Membership</Link>
            <hr className="border-border" />
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link href="/auth" onClick={() => setIsOpen(false)}>Login / Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
