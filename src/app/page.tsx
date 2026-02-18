
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={cricketHero?.imageUrl || "https://picsum.photos/seed/stadium/1200/600"} 
            alt="Stadium" 
            fill 
            className="object-cover opacity-30 scale-105"
            priority
            data-ai-hint="cricket stadium"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Zap className="h-3 w-3" /> Unleash Your Inner Athlete
          </div>
          <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]">
            BOOK CRICKET & <br /> 
            <span className="text-primary italic">BADMINTON</span> COURTS
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-medium">
            India's premier sports facility booking platform. Real-time availability, instant confirmations, and exclusive membership benefits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cricket">
              <Button size="lg" className="h-14 px-8 font-bold text-lg rounded-full bg-primary text-primary-foreground neon-glow-blue">
                Book Cricket Ground
              </Button>
            </Link>
            <Link href="/badminton">
              <Button size="lg" variant="outline" className="h-14 px-8 font-bold text-lg rounded-full border-secondary text-secondary hover:bg-secondary/10">
                Book Badminton Court
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sports */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="font-headline text-4xl font-bold tracking-tight">CHOOSE YOUR SPORT</h2>
              <p className="text-muted-foreground">Select from our world-class facilities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/cricket">
              <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer">
                <Image 
                  src={cricketHero?.imageUrl || ""} 
                  alt="Cricket" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="cricket player"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                  <h3 className="font-headline text-3xl font-bold text-white mb-2">Cricket Ground</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-foreground bg-primary px-3 py-1 rounded text-sm font-bold uppercase">Open for Booking</span>
                    <Button variant="ghost" className="text-white p-0 group-hover:translate-x-2 transition-transform">
                      EXPLORE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/badminton">
              <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer">
                <Image 
                  src={badmintonHero?.imageUrl || ""} 
                  alt="Badminton" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="badminton court"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                  <h3 className="font-headline text-3xl font-bold text-white mb-2">Badminton Court</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-foreground bg-secondary px-3 py-1 rounded text-sm font-bold uppercase">Indoor Facility</span>
                    <Button variant="ghost" className="text-white p-0 group-hover:translate-x-2 transition-transform">
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
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline text-4xl font-bold">THE PLAYARENA EDGE</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Why thousands of athletes trust us for their daily game.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="h-8 w-8 text-primary" />, title: "Instant Booking", desc: "No more phone calls. Book your slot in 30 seconds." },
              { icon: <ShieldCheck className="h-8 w-8 text-secondary" />, title: "Secure Payment", desc: "Trusted Razorpay integration for all transactions." },
              { icon: <Zap className="h-8 w-8 text-primary" />, title: "Top Facilities", desc: "Professional grade turfs and international standard courts." },
              { icon: <Calendar className="h-8 w-8 text-secondary" />, title: "Easy Scheduling", desc: "Manage your bookings with a flexible user dashboard." }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl text-center hover:translate-y-[-8px] transition-transform">
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="font-headline text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Highlight */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex-1 space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight">UNLOCK EXCLUSIVE <br /> <span className="text-primary italic">MEMBERSHIP</span> PLANS</h2>
              <p className="text-muted-foreground text-lg">Get up to 25% discount on every booking, priority slot access, and free weekend hours.</p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Flat 15% discount on Gold Plan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> 24-hour advance slot booking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Free equipment rentals included</li>
              </ul>

              <Link href="/membership">
                <Button size="lg" className="h-12 px-8 font-bold rounded-full bg-primary text-primary-foreground mt-4">
                  View All Plans
                </Button>
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="glass-card p-6 rounded-2xl border-primary/20 bg-primary/5">
                  <div className="text-3xl font-black text-primary mb-1">2k+</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Members</div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <div className="text-3xl font-black text-white mb-1">15+</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Arenas</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="glass-card p-6 rounded-2xl">
                  <div className="text-3xl font-black text-white mb-1">50k+</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Bookings</div>
                </div>
                <div className="glass-card p-6 rounded-2xl border-secondary/20 bg-secondary/5">
                  <div className="text-3xl font-black text-secondary mb-1">4.9</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
            <h2 className="font-headline text-4xl font-bold">ATHLETE REVIEWS</h2>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full"><Users className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", sport: "Cricket", text: "Best turf in Bangalore! The lights are amazing for night matches and the booking was super smooth." },
              { name: "Ananya M.", sport: "Badminton", text: "The wooden courts are international standard. Really happy with the hygiene and staff behavior." },
              { name: "Vikram R.", sport: "Multiple", text: "Been a Gold member for 6 months now. The discount pays for the membership itself. Highly recommended!" }
            ].map((item, idx) => (
              <Card key={idx} className="glass-card border-none">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Zap key={s} className="h-4 w-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-muted-foreground italic mb-6">"{item.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.sport} Enthusiast</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
