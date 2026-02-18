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
        <div className="absolute inset-0 z-0 bg-white">
          <Image 
            src={cricketHero?.imageUrl || "https://picsum.photos/seed/stadium/1200/600"} 
            alt="Stadium" 
            fill 
            className="object-cover opacity-15 scale-105"
            priority
            data-ai-hint="cricket stadium"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Zap className="h-3 w-3" /> Unleash Your Inner Athlete
          </div>
          <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]">
            BOOK CRICKET & <br /> 
            <span className="text-primary italic">BADMINTON</span> COURTS
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-medium">
            Experience world-class sports facilities with instant booking and exclusive perks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cricket">
              <Button size="lg" className="h-14 px-8 font-bold text-lg rounded-full bg-primary text-primary-foreground neon-glow-blue">
                Book Cricket Ground
              </Button>
            </Link>
            <Link href="/badminton">
              <Button size="lg" variant="outline" className="h-14 px-8 font-bold text-lg rounded-full border-primary/30 text-primary hover:bg-primary/5">
                Book Badminton Court
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
              <h2 className="font-headline text-4xl font-bold tracking-tight">CHOOSE YOUR SPORT</h2>
              <p className="text-muted-foreground">Select from our world-class facilities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/cricket">
              <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                <Image 
                  src={cricketHero?.imageUrl || "https://picsum.photos/seed/cricket/600/400"} 
                  alt="Cricket" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="cricket player"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-headline text-3xl font-bold text-white mb-2">Cricket Ground</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-foreground bg-primary px-3 py-1 rounded text-sm font-bold uppercase">Open for Booking</span>
                    <Button variant="ghost" className="text-white p-0 group-hover:translate-x-2 transition-transform hover:bg-transparent">
                      EXPLORE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/badminton">
              <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                <Image 
                  src={badmintonHero?.imageUrl || "https://picsum.photos/seed/badminton/600/400"} 
                  alt="Badminton" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="badminton court"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-headline text-3xl font-bold text-white mb-2">Badminton Court</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-foreground bg-primary px-3 py-1 rounded text-sm font-bold uppercase">Indoor Facility</span>
                    <Button variant="ghost" className="text-white p-0 group-hover:translate-x-2 transition-transform hover:bg-transparent">
                      EXPLORE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline text-4xl font-bold text-foreground">THE PLAYARENA EDGE</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Why thousands of athletes trust us for their daily game.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="h-8 w-8 text-primary" />, title: "Instant Booking", desc: "No more phone calls. Book your slot in 30 seconds." },
              { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: "Secure Payment", desc: "Trusted Razorpay integration for all transactions." },
              { icon: <Zap className="h-8 w-8 text-primary" />, title: "Top Facilities", desc: "Professional grade turfs and international standard courts." },
              { icon: <Calendar className="h-8 w-8 text-primary" />, title: "Easy Scheduling", desc: "Manage your bookings with a flexible user dashboard." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl text-center shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="font-headline text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Highlight */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative border border-primary/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex-1 space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight text-foreground">UNLOCK EXCLUSIVE <br /> <span className="text-primary italic">MEMBERSHIP</span> PLANS</h2>
              <p className="text-muted-foreground text-lg">Get up to 25% discount on every booking, priority slot access, and free weekend hours.</p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Flat 15% discount on Gold Plan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> 24-hour advance slot booking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Free equipment rentals included</li>
              </ul>

              <Link href="/membership">
                <Button size="lg" className="h-12 px-8 font-bold rounded-full bg-primary text-primary-foreground mt-4 shadow-lg shadow-primary/20">
                  View All Plans
                </Button>
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-primary/20 shadow-sm">
                  <div className="text-3xl font-black text-primary mb-1">2k+</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Members</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <div className="text-3xl font-black text-foreground mb-1">15+</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Arenas</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <div className="text-3xl font-black text-foreground mb-1">50k+</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Bookings</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-primary/20 shadow-sm">
                  <div className="text-3xl font-black text-primary mb-1">4.9</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Rating</div>
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
