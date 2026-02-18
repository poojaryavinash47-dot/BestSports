
import Link from "next/link";
import { Trophy, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl font-bold tracking-tighter">PLAYARENA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premier booking platform for sports enthusiasts. Experience professional courts and seamless booking.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cricket" className="text-muted-foreground hover:text-primary">Cricket Grounds</Link></li>
              <li><Link href="/badminton" className="text-muted-foreground hover:text-primary">Badminton Courts</Link></li>
              <li><Link href="/membership" className="text-muted-foreground hover:text-primary">Membership Plans</Link></li>
              <li><Link href="/auth" className="text-muted-foreground hover:text-primary">Join Now</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Sports Arena, Bangalore, India</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@playarena.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Get updates on tournament and special offers.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="flex-1 bg-muted border-none rounded-md px-3 py-2 text-sm" />
              <button className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-md hover:opacity-90 transition-opacity">OK</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PlayArena. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
