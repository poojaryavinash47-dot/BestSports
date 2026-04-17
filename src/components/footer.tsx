
import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center md:justify-items-stretch">
          <div className="space-y-6 md:col-span-1 w-full flex flex-col items-center md:items-start">
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
              <Link href="https://www.instagram.com/bestshotbadminton_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.google.com/search?q=best+shot+sports+yelahanka&sca_esv=ab78fc3432efc4ca&sxsrf=ANbL-n5KM_w9_qTd40VpAPek_f_lZenwcA%3A1776425392289&ei=sBniaeOqEd-6seMPx_DXuA0&biw=1536&bih=738&oq=best+shot+sports+yela&gs_lp=Egxnd3Mtd2l6LXNlcnAiFWJlc3Qgc2hvdCBzcG9ydHMgeWVsYSoCCAAyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKABSNcbUIMDWIcOcAF4AJABAJgBvASgAb4PqgEJMi0xLjIuMS4xuAEByAEA-AEBmAIGoAKgEMICCRAAGLADGAgYHsICDhAAGIAEGLADGIYDGIoFwgIIEAAYsAMY7wXCAgYQABgWGB7CAgcQIRigARgKwgIFECEYnwWYAwCIBgGQBgqSBwkxLjMtMy4xLjGgB5casgcHMy0zLjEuMbgHkhDCBwcyLTIuMy4xyAdAgAgA&sclient=gws-wiz-serp#sv=CAwSuQIKBmxjbF9wdhI7CgNwdnESNENnMHZaeTh4TVdveWNETnhkRE54SWhZS0VHSmxjM1FnYzJodmRDQnpjRzl5ZEhNUUFoZ0QSkAEKA2xxaRKIAUNocGlaWE4wSUhOb2IzUWdjM0J2Y25SeklIbGxiR0ZvWVc1cllTSURxQUVCU1BiSTdkR0tzSUNBQ0Zvb0VBQVFBUkFDR0FBWUFSZ0RJaHBpWlhOMElITm9iM1FnYzNCdmNuUnpJSGxsYkdGb1lXNXJZWklCRG1KaFpHMXBiblJ2Ymw5amJIVmkSKgoDdGJzEiNscmY6ITNzQ2c4U0RYSmhkR2x1WjE5bWFXeDBaWElnQVE9PRIfCgFxEhpiZXN0IHNob3Qgc3BvcnRzIHllbGFoYW5rYRoSbG9jYWwtcGxhY2Utdmlld2VyGAog0d6kpwc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                {/* Google SVG icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.531-6.656-2.531-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.648z" fill="#FFC107"/>
                    <path d="M3.152 7.345l3.289 2.414c.898-1.789 2.617-2.961 4.599-2.961 1.125 0 2.188.398 3.008 1.172l2.844-2.766c-1.711-1.57-3.922-2.531-6.656-2.531-3.789 0-7.016 2.461-8.406 5.922l3.322 2.25z" fill="#FF3D00"/>
                    <path d="M12.04 22c2.672 0 4.922-.883 6.563-2.406l-3.031-2.484c-.844.633-2.008 1.078-3.531 1.078-2.719 0-5.016-1.828-5.844-4.297l-3.273 2.523c1.477 3.406 4.844 5.586 9.116 5.586z" fill="#4CAF50"/>
                    <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-.547.07-1.078.172-1.578l-3.289-2.414c-.422.844-.664 1.789-.664 2.992 0 5.523 4.477 10 10 10 5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.648z" fill="#1976D2"/>
                  </g>
                </svg>
              </Link>
            </div>
          </div>

          <div className="w-full flex flex-col items-center md:items-start">
            <h3 className="font-headline font-black text-lg mb-6 uppercase italic tracking-tighter">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              
              <li><Link href="/subscriptions" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Subscriptions Plans</Link></li>
              <li><Link href="/membership" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Membership Plans</Link></li>
              <li><Link href="/gallery" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Gallery</Link></li>
              <li><Link href="/contact-us" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Contact Us</Link></li>
              <li><Link href="/auth" className="text-blue-100/70 hover:text-primary transition-colors uppercase italic tracking-tighter">Admin</Link></li>
            </ul>
          </div>

          <div className="w-full flex flex-col items-center md:items-start">
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

          {/* Newsletter section removed */}
        </div>
        <div className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-blue-100/40 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} BEST SHOT CRICKET. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
