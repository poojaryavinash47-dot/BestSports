
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Trophy
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const cricketHero = PlaceHolderImages.find(img => img.id === 'cricket-hero');
  const badmintonHero = PlaceHolderImages.find(img => img.id === 'badminton-hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent"></div>
          
          <Image 
            src={cricketHero?.imageUrl || "https://picsum.photos/seed/stadium/1200/600"} 
            alt="Stadium Background" 
            fill 
            className="object-cover opacity-[0.03] grayscale pointer-events-none"
            priority
          />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <div className="flex flex-col items-center max-w-5xl mx-auto">
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Trophy className="h-4 w-4" /> 
              <span>Bangalore's #1 Sports Network</span>
            </div>
            
            {/* High-Impact Typography */}
            <h1 className="font-headline text-6xl md:text-[8.5rem] font-black tracking-tighter text-secondary leading-[0.8] uppercase italic mb-6">
              OWN THE <br />
              <span className="text-primary not-italic inline-block drop-shadow-sm">COURT.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-2xl font-medium mt-4 mb-12 leading-relaxed">
              Experience world-class sports infrastructure with instant booking, professional maintenance, and elite club perks.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl">
              <Link href="/cricket" className="w-full sm:w-auto">
                <Button size="lg" className="h-16 px-10 font-black text-xl rounded-2xl btn-orange w-full sm:min-w-[280px] shadow-xl hover:scale-105 transition-all">
                  BOOK CRICKET
                </Button>
              </Link>
              <Link href="/badminton" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-16 px-10 font-black text-xl rounded-2xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-white w-full sm:min-w-[280px] transition-all shadow-lg">
                  BADMINTON
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-secondary/5 w-full flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
              <div className="flex items-center gap-2 font-bold text-secondary text-sm">
                <CheckCircle2 className="h-4 w-4" /> 50+ Arenas
              </div>
              <div className="flex items-center gap-2 font-bold text-secondary text-sm">
                <CheckCircle2 className="h-4 w-4" /> Instant KYC
              </div>
              <div className="flex items-center gap-2 font-bold text-secondary text-sm">
                <CheckCircle2 className="h-4 w-4" /> 24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sports Selection */}
      <section className="py-32 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="font-headline text-5xl font-black tracking-tight text-secondary uppercase italic">Elite Selection</h2>
              <p className="text-muted-foreground font-medium text-lg">Choose your arena and start your winning streak.</p>
            </div>
            <Link href="/membership">
              <Button variant="link" className="text-secondary font-black group gap-2 text-lg">
                VIEW ALL FACILITIES <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Link href="/cricket">
              <Card className="group relative overflow-hidden border-none aspect-[16/10] cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-500 rounded-[2.5rem]">
                <Image 
                  src={cricketHero?.imageUrl || "https://picsum.photos/seed/cricket/800/500"} 
                  alt="Cricket" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <span className="text-white bg-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg mb-4 inline-block">Pro Tournament Grade</span>
                  <h3 className="font-headline text-5xl font-black text-white uppercase italic tracking-tighter mt-2">Cricket Arenas</h3>
                </div>
              </Card>
            </Link>

            <Link href="/badminton">
              <Card className="group relative overflow-hidden border-none aspect-[16/10] cursor-pointer shadow-2xl hover:shadow-secondary/20 transition-all duration-500 rounded-[2.5rem]">
                <Image 
                  src={badmintonHero?.imageUrl || "https://picsum.photos/seed/badminton/800/500"} 
                  alt="Badminton" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <span className="text-white bg-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg mb-4 inline-block">Olympic Standard</span>
                  <h3 className="font-headline text-5xl font-black text-white uppercase italic tracking-tighter mt-2">Indoor Courts</h3>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Advantage Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-headline text-5xl font-black text-secondary tracking-tighter uppercase italic">The Advantage</h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-medium text-lg">Why serious athletes trust PlayArena.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { icon: <Clock className="h-10 w-10 text-primary" />, title: "Live Booking", desc: "Real-time slot tracking and instant confirmation." },
              { icon: <ShieldCheck className="h-10 w-10 text-primary" />, title: "Elite Maintenance", desc: "Weekly professional turf grading and court cleaning." },
              { icon: <Zap className="h-10 w-10 text-primary" />, title: "Club House", desc: "Premium showers, secure lockers, and pro lounges." },
              { icon: <Calendar className="h-10 w-10 text-primary" />, title: "Tournaments", desc: "Integrated tools for organizing group play & leagues." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-10 rounded-[2.5rem] border border-transparent hover:border-secondary/10 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
                <div className="mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-headline text-2xl font-bold mb-3 text-secondary uppercase tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-secondary text-white rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
              <h2 className="font-headline text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic">GO <span className="text-primary not-italic">PLATINUM</span></h2>
              <p className="text-blue-100 text-xl font-medium max-w-xl">Unlock the full PlayArena experience with exclusive priority access and massive savings.</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
                <li className="flex items-center gap-3 font-bold text-lg"><CheckCircle2 className="h-6 w-6 text-primary" /> 25% Flat Discount</li>
                <li className="flex items-center gap-3 font-bold text-lg"><CheckCircle2 className="h-6 w-6 text-primary" /> Early Bird Slots</li>
                <li className="flex items-center gap-3 font-bold text-lg"><CheckCircle2 className="h-6 w-6 text-primary" /> Pro Gear Rental</li>
                <li className="flex items-center gap-3 font-bold text-lg"><CheckCircle2 className="h-6 w-6 text-primary" /> Monthly Guest Pass</li>
              </ul>

              <Link href="/membership" className="inline-block pt-4">
                <Button size="lg" className="h-16 px-12 font-black rounded-2xl btn-orange text-xl uppercase italic tracking-tighter shadow-2xl">
                  UPGRADE MY MEMBERSHIP
                </Button>
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6 z-10 w-full max-w-md">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center">
                  <div className="text-5xl font-black text-primary mb-1 tracking-tighter italic">5k+</div>
                  <div className="text-xs font-black uppercase tracking-widest text-blue-200">Elite Pros</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center">
                  <div className="text-5xl font-black text-white mb-1 tracking-tighter italic">20+</div>
                  <div className="text-xs font-black uppercase tracking-widest text-blue-200">Arenas</div>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center">
                  <div className="text-5xl font-black text-white mb-1 tracking-tighter italic">100k+</div>
                  <div className="text-xs font-black uppercase tracking-widest text-blue-200">Games Won</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center">
                  <div className="text-5xl font-black text-primary mb-1 tracking-tighter italic">4.9</div>
                  <div className="text-xs font-black uppercase tracking-widest text-blue-200">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
