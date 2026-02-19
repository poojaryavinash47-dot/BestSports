
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
  Trophy
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const cricketHero = PlaceHolderImages.find(img => img.id === 'cricket-hero');
  const badmintonHero = PlaceHolderImages.find(img => img.id === 'badminton-hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={cricketHero?.imageUrl || "https://picsum.photos/seed/stadium/1200/600"} 
            alt="Cricket Ground" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-background"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-white">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-sm">
              <Trophy className="h-4 w-4 text-primary" /> 
              <span>Bangalore's Premier Sports Network</span>
            </div>
            
            <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-tight">
              BOOK YOUR COURT <br />
              <span className="text-primary not-italic">PLAY LIKE A PRO.</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-blue-50 text-lg md:text-xl font-medium mt-6 mb-10">
              Experience world-class sports infrastructure with instant booking, professional maintenance, and elite club perks.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link href="/cricket" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 font-black text-lg rounded-xl btn-orange w-full sm:min-w-[220px]">
                  BOOK CRICKET
                </Button>
              </Link>
              <Link href="/badminton" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 font-black text-lg rounded-xl btn-orange w-full sm:min-w-[220px]">
                  BOOK BADMINTON
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sports */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="font-headline text-4xl font-black tracking-tight text-secondary uppercase italic">Our Facilities</h2>
              <p className="text-muted-foreground font-medium">Professional grade arenas for serious athletes.</p>
            </div>
            <Link href="/membership">
              <Button variant="link" className="text-secondary font-bold group gap-2">
                VIEW MEMBERSHIPS <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/cricket">
              <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer shadow-xl rounded-[2rem]">
                <Image 
                  src={cricketHero?.imageUrl || "https://picsum.photos/seed/cricket/800/500"} 
                  alt="Cricket" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-white bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Pro Turf</span>
                  <h3 className="font-headline text-4xl font-black text-white uppercase italic tracking-tighter">Cricket Arenas</h3>
                </div>
              </Card>
            </Link>

            <Link href="/badminton">
              <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer shadow-xl rounded-[2rem]">
                <Image 
                  src={badmintonHero?.imageUrl || "https://picsum.photos/seed/badminton/800/500"} 
                  alt="Badminton" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-white bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Olympic Standard</span>
                  <h3 className="font-headline text-4xl font-black text-white uppercase italic tracking-tighter">Indoor Courts</h3>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Advantage Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-black text-secondary uppercase italic">The Advantage</h2>
            <p className="text-muted-foreground mt-2">Why athletes choose PlayArena.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="h-8 w-8 text-primary" />, title: "Live Booking", desc: "Real-time slot tracking and instant confirmation." },
              { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: "Elite Maintenance", desc: "Weekly professional turf grading and court cleaning." },
              { icon: <Zap className="h-8 w-8 text-primary" />, title: "Club House", desc: "Premium showers, secure lockers, and pro lounges." },
              { icon: <Calendar className="h-8 w-8 text-primary" />, title: "Leagues", desc: "Tools for organizing group play & tournaments." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-transparent hover:border-secondary/10 transition-all group">
                <div className="mb-6">{item.icon}</div>
                <h3 className="font-headline text-xl font-bold mb-2 text-secondary uppercase">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
