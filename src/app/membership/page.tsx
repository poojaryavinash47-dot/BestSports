
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Trophy, Shield, Zap, Star } from "lucide-react";

const PLANS = [
  {
    id: "silver",
    name: "Silver",
    price: "999",
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    border: "border-slate-400/20",
    features: [
      "5% discount on all bookings",
      "Access to basic amenities",
      "Standard slot booking",
      "Member lounge access"
    ]
  },
  {
    id: "gold",
    name: "Gold",
    price: "1999",
    popular: true,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    features: [
      "15% discount on all bookings",
      "Priority slot booking (24h early)",
      "Free equipment rental (2/mo)",
      "Dedicated lockers",
      "Exclusive Gold events"
    ]
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "3999",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    features: [
      "25% discount on all bookings",
      "Unlimited equipment rental",
      "Priority customer support",
      "2 Free hours every month",
      "Bring a guest for free (1/mo)",
      "Access to all facility areas"
    ]
  }
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter">JOIN THE <span className="text-primary italic">CLUB</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose a membership plan that fits your game. Save big and get exclusive perks at all our facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <Card key={plan.id} className={`glass-card flex flex-col relative overflow-hidden transition-all hover:scale-105 duration-300 ${plan.popular ? 'border-primary ring-1 ring-primary/50' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-8 py-1 rotate-45 translate-x-6 translate-y-2">
                      Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-10">
                  <div className={`w-16 h-16 ${plan.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    {plan.id === 'silver' && <Shield className={`h-8 w-8 ${plan.color}`} />}
                    {plan.id === 'gold' && <Trophy className={`h-8 w-8 ${plan.color}`} />}
                    {plan.id === 'platinum' && <Zap className={`h-8 w-8 ${plan.color}`} />}
                  </div>
                  <CardTitle className={`font-headline text-3xl font-bold ${plan.color}`}>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-black tracking-tighter">₹{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className={`h-5 w-5 ${plan.color} shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pb-10 pt-6">
                  <Button 
                    className={`w-full h-12 font-bold rounded-xl ${plan.popular ? 'bg-primary text-primary-foreground neon-glow-blue' : 'bg-muted hover:bg-muted/80'}`}
                  >
                    CHOOSE {plan.name.toUpperCase()}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Comparative Section */}
          <div className="mt-32 glass-card p-8 md:p-12 rounded-[2rem]">
            <h2 className="font-headline text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="font-bold text-primary">Can I cancel my membership anytime?</h3>
                <p className="text-sm text-muted-foreground">Yes, memberships are billed monthly and can be cancelled at any time from your dashboard.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-primary">Does the discount apply to all sports?</h3>
                <p className="text-sm text-muted-foreground">Absolutely! Your member discount is valid for both Cricket ground and Badminton court bookings.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-primary">How do I access priority booking?</h3>
                <p className="text-sm text-muted-foreground">Gold and Platinum members will see slots available for booking 24 hours before they open for general users.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-primary">Can I share my membership?</h3>
                <p className="text-sm text-muted-foreground">Memberships are individual. However, Platinum members can bring a guest once a month for free.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
