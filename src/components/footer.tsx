import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-headline text-3xl font-black leading-none tracking-tighter uppercase italic">
                BEST SHOT
              </span>
              <span className="font-headline text-sm font-bold leading-none tracking-[0.2em] text-primary uppercase">
                CRICKET
              </span>
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
              <li><Link href="/cricket" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Cricket Grounds</Link></li>
              <li><Link href="/badminton" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Badminton Courts</Link></li>
              <li><Link href="/membership" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Membership Plans</Link></li>
              <li><Link href="/auth" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Join the Club</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-black text-lg mb-6 uppercase italic tracking-tighter">Contact Us</h3>
            <ul className="space-y-4 text-sm font-medium text-blue-100/70">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Sector 7, HSR Layout, Bangalore</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+91 9900 8877 66</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@bestshotcricket.com</span>
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
