import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Users
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const cricketHero = PlaceHolderImages.find(img => img.id === 'cricket-hero');
  const badmintonHero = PlaceHolderImages.find(img => img.id === 'badminton-hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={cricketHero?.imageUrl || "https://picsum.photos/seed/stadium/1200/600"} 
            alt="Stadium" 
            fill 
            className="object-cover opacity-10 scale-105"
            priority
            data-ai-hint="cricket stadium"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-white/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/20 text-secondary text-sm font-black uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Zap className="h-4 w-4" /> Professional Arenas Only
          </div>
          <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]">
            BOOK CRICKET & <br /> 
            <span className="text-secondary italic">BADMINTON</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-medium">
            World-class sports facilities with instant booking and professional maintenance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cricket">
              <Button size="lg" className="h-14 px-8 font-black text-lg rounded-full btn-orange min-w-[240px]">
                BOOK CRICKET GROUND
              </Button>
            </Link>
            <Link href="/badminton">
              <Button size="lg" variant="outline" className="h-14 px-8 font-black text-lg rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white min-w-[240px] transition-all">
                BADMINTON COURTS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sports */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 text-center md:text-left">
            <div className="space-y-2 w-full">
              <h2 className="font-headline text-4xl font-black tracking-tight text-secondary">CHOOSE YOUR SPORT</h2>
              <p className="text-muted-foreground font-medium">Select from our world-class facilities near you.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/cricket">
              <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem]">
                <Image 
                  src={cricketHero?.imageUrl || "https://picsum.photos/seed/cricket/600/400"} 
                  alt="Cricket" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="cricket player"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-headline text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Cricket Arena</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white bg-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Available Now</span>
                    <Button variant="ghost" className="text-white p-0 group-hover:translate-x-2 transition-transform hover:bg-transparent font-bold">
                      EXPLORE <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/badminton">
              <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem]">
                <Image 
                  src={badmintonHero?.imageUrl || "https://picsum.photos/seed/badminton/600/400"} 
                  alt="Badminton" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="badminton court"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-headline text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Indoor Courts</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white bg-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Premium Facility</span>
                    <Button variant="ghost" className="text-white p-0 group-hover:translate-x-2 transition-transform hover:bg-transparent font-bold">
                      EXPLORE <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline text-4xl font-black text-secondary tracking-tighter uppercase italic">The PlayArena Advantage</h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-medium">Why athletes choose us for their professional game.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="h-8 w-8 text-primary" />, title: "Instant Booking", desc: "Real-time availability for all our premium courts." },
              { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: "Pro Maintenance", desc: "Weekly turf cleaning and professional court grading." },
              { icon: <Zap className="h-8 w-8 text-primary" />, title: "Club Experience", desc: "Professional amenities including showers and lockers." },
              { icon: <Calendar className="h-8 w-8 text-primary" />, title: "Bulk Booking", desc: "Plan your weekend tournaments with easy group booking." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] text-center shadow-sm border border-secondary/5 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-headline text-xl font-bold mb-2 text-secondary">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Highlight */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-secondary text-white rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative border border-secondary shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex-1 space-y-6 z-10">
              <h2 className="font-headline text-4xl md:text-6xl font-black leading-tight tracking-tighter uppercase italic">GET THE <br /> <span className="text-primary">GOLD PASS</span></h2>
              <p className="text-blue-100 text-lg font-medium">Unlock 25% discount, priority slots, and free guest entries every month.</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5 text-primary" /> Flat 25% Off</li>
                <li className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5 text-primary" /> Priority Access</li>
                <li className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5 text-primary" /> Free Equipment</li>
                <li className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5 text-primary" /> Guest Passes</li>
              </ul>

              <Link href="/membership">
                <Button size="lg" className="h-14 px-10 font-black rounded-full btn-orange text-lg mt-4 uppercase italic tracking-tighter">
                  UPGRADE NOW
                </Button>
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 z-10 w-full">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                  <div className="text-4xl font-black text-primary mb-1 tracking-tighter italic">2k+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-200">Active Pros</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                  <div className="text-4xl font-black text-white mb-1 tracking-tighter italic">15+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-200">Elite Arenas</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                  <div className="text-4xl font-black text-white mb-1 tracking-tighter italic">50k+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-200">Wins Logged</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                  <div className="text-4xl font-black text-primary mb-1 tracking-tighter italic">4.9</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-200">User Rating</div>
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
