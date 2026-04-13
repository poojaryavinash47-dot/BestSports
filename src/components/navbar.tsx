"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  Home, 
  Target, 
  Zap, 
  Award, 
  Mail, 
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Subscription", href: "/subscriptions", icon: Award },
    { label: "Membership", href: "/membership", icon: Award },
    { label: "Gallery", href: "/gallery", icon: Zap },
    { label: "Contact", href: "/contact", icon: Mail },
    { label: "Location", href: "/location", icon: MapPin },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b bg-background/95 backdrop-blur-lg shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="flex h-12 sm:h-14 md:h-16">
              <Image
                src="/logo.png"
                alt="Best Shot BSBA Sports Arena Logo"
                height={64}
                width={160}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 ml-8">
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
            {/* admin login moved to footer quick links */}
          </div>
        </div>
      )}
    </nav>
  );
}
