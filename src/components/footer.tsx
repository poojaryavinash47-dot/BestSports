
import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-14 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-secondary">
                  <path d="M50 5 L10 25 L10 50 C10 75 50 95 50 95 C50 95 90 75 90 50 L90 25 L50 5 Z" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white pb-1">
                  <span className="text-[14px] font-black leading-none">B</span>
                  <div className="w-6 h-[1px] bg-primary my-0.5"></div>
                  <span className="text-[6px] font-bold tracking-tighter">EST 2025</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-3xl font-black leading-none tracking-tighter uppercase italic">
                  BEST SHOT
                </span>
                <span className="font-headline text-sm font-bold leading-none tracking-[0.2em] text-primary uppercase">
                  CRICKET
                </span>
              </div>
            </div>
            <p className="text-sm text-blue-100/70 font-medium leading-relaxed">
              Professional cricket arenas and badminton courts for the serious athlete. Excellence in maintenance and community since 2025.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-black text-lg mb-6 uppercase italic tracking-tighter">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              
              <li><Link href="/subscriptions" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Subscriptions Plans</Link></li>
              <li><Link href="/membership" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Membership Plans</Link></li>
              <li><Link href="/gallery" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Gallery</Link></li>
              <li><Link href="/contact" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Contact</Link></li>
              <li><Link href="/location" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Location</Link></li>
              <li><Link href="/auth" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-black text-lg mb-6 uppercase italic tracking-tighter">Contact Us</h3>
            <ul className="space-y-4 text-sm font-medium text-blue-100/70">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>686/42/3, 8th Cross Attur V, near CQAL Layout, 4th Phase, Attur Layout, Yelahanka New Town, Bengaluru, Karnataka 560064</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+91 96320 757 09</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>bestshotbsba@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-black text-lg mb-6 uppercase italic tracking-tighter">Newsletter</h3>
            <p className="text-sm text-blue-100/70 mb-6 font-medium">Get updates on tournaments and special membership offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
              />
              <button className="bg-primary text-white font-black px-6 py-3 rounded-xl hover:opacity-90 transition-opacity uppercase italic tracking-tighter">JOIN</button>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-blue-100/40 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} BEST SHOT CRICKET. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
