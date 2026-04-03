import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type CourtDetail = {
  id: string;
  name: string;
  price: string; // e.g. "₹500/hour"
  description: string;
  images: string[];
  badge?: string;
};

const COURTS: CourtDetail[] = [
  {
    id: "b1",
    name: "Elite Indoor Court 1",
    price: "₹400/hour",
    description:
      "High-grip wooden flooring with pro LED lighting. Ideal for intense singles and doubles practice sessions.",
    badge: "Available",
    images: [
      "/b1.png",
      "/b2.png",
      "/b3.png",
    ],
  },
  {
    id: "b2",
    name: "Elite Indoor Court 2",
    price: "₹450/hour",
    description:
      "Tournament-ready court with premium shuttle response and dedicated warm-up area.",
    badge: "Prime Slot",
    images: [
      "/b4.png",
      "/b5.png",
      "/b1.png",
    ],
  },
  {
    id: "b3",
    name: "Training Court A",
    price: "₹350/hour",
    description:
      "Perfect for coaching batches and drilling sessions with consistent bounce and clear court markings.",
    badge: "Available",
    images: [
      "/b1.png",
      "/b2.png",
      "/b3.png",
    ],
  },
  {
    id: "b4",
    name: "Training Court B",
    price: "₹350/hour",
    description:
      "Dedicated practice court with balanced lighting and ample side run-up space.",
    badge: "Available",
    images: [
      "/b4.png",
      "/b5.png",
      "/b1.png",
    ],
  },
  {
    id: "b5",
    name: "Club Court 1",
    price: "₹500/hour",
    description:
      "Club-level court with exclusive member lounge access and premium shuttle options.",
    badge: "Popular",
    images: [
      "/b2.png",
      "/b5.png",
      "/b4.png",
    ],
  },
  {
    id: "b6",
    name: "Club Court 2",
    price: "₹500/hour",
    description:
      "Spacious indoor court designed for league nights and friendly club matches.",
    badge: "Available",
    images: [
      "/b1.png",
      "/b2.png",
      "/b3.png",
    ],
  },
  {
    id: "c1",
    name: "Pro Turf Arena 1",
    price: "₹1,200/hour",
    description:
      "Full-size cricket turf with laser-leveled outfield, ideal for nets and practice matches.",
    badge: "Available",
    images: [
      "/c1.png",
      "/c2.png",
      "/c3.png",
    ],
  },
  {
    id: "c2",
    name: "Pro Turf Arena 2",
    price: "₹1,300/hour",
    description:
      "Match-ready turf with side nets, perfect for high-intensity training sessions.",
    badge: "Prime Slot",
    images: [
      "/c1.png",
      "/c2.png",
      "/c3.png",
    ],
  },
  {
    id: "c3",
    name: "Weekend League Ground",
    price: "₹1,500/hour",
    description:
      "Dedicated weekend ground for corporate and academy leagues with pavilion seating.",
    badge: "Popular",
    images: [
      "/c1.png",
      "/c2.png",
      "/c3.png",
    ],
  },
  {
    id: "c4",
    name: "Academy Practice Ground",
    price: "₹1,000/hour",
    description:
      "Coaching-first ground with multiple net lanes and side practice areas.",
    badge: "Available",
    images: [
      "/c1.png",
      "/c2.png",
      "/c3.png",
    ],
  },
  {
    id: "c5",
    name: "Night Match Arena",
    price: "₹1,800/hour",
    description:
      "Floodlit stadium-style ground with HD LED lights for night tournaments.",
    badge: "Floodlights",
    images: [
      "/c1.png",
      "/c2.png",
      "/c3.png",
    ],
  },
  {
    id: "c6",
    name: "Corporate League Ground",
    price: "₹1,600/hour",
    description:
      "Ideal for day-long tournaments with scoring table, PA system, and spectator zones.",
    badge: "Available",
    images: [
      "/c1.png",
      "/c2.png",
      "/c3.png",
    ],
  },
];

interface CourtPageProps {
  params: { id: string };
}

export default function CourtPage({ params }: CourtPageProps) {
  const court = COURTS.find((c) => c.id === params.id);
  if (!court) {
    notFound();
  }
  const [mainImage, ...otherImages] = court.images;
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 flex items-center gap-2">
              {court.badge && (
                <Badge className="bg-emerald-500 text-white border-transparent text-[10px] font-semibold uppercase tracking-widest">
                  {court.badge}
                </Badge>
              )}
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Court Details
              </span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-secondary uppercase italic">
              {court.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground">
              {court.description}
            </p>
            <div className="mt-5 flex items-end gap-3">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                {court.price}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                per hour
              </span>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[2fr,1fr] items-start">
            {/* Image gallery */}
            <div className="space-y-4">
              <div className="group relative aspect-video overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100">
                <Image
                  src={mainImage}
                  alt={court.name}
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              {otherImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {otherImages.map((img, index) => (
                    <div
                      key={index}
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100"
                    >
                      <Image
                        src={img}
                        alt={`${court.name} view ${index + 2}`}
                        fill
                        sizes="(min-width: 1024px) 260px, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Booking summary */}
            <Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-lg backdrop-blur-sm p-6 flex flex-col gap-6">
              <div>
                <h2 className="font-headline text-xl font-bold text-secondary uppercase">
                  Booking Summary
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reserve this court instantly. Choose your preferred date and
                  slot on the next step.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-muted-foreground space-y-2">
                <div className="flex justify-between">
                  <span>Court</span>
                  <span className="font-medium text-secondary">{court.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate</span>
                  <span className="font-semibold text-primary">{court.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-medium text-emerald-600">
                    {court.badge || "Available"}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• Professional maintenance and lighting included.</p>
                <p>• Complimentary drinking water and basic gear storage.</p>
                <p>• Flexible reschedule policy up to 6 hours before play.</p>
              </div>
              <div className="mt-auto flex flex-col gap-3">
               <Button asChild variant="outline" className="w-full h-11 rounded-full text-sm font-semibold mt-1">
                  <Link href="/">Cancel</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
