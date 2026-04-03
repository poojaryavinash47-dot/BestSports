"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Court = {
  id: string;
  name: string;
  price: string; // e.g. "
  badge?: string;
  imageUrl: string;
  href: string;
};

export interface CourtCardProps {
  court: Court;
}

export function CourtCard({ court }: CourtCardProps) {
  const handleBooking = (selectedCourt: Court) => {
    // Placeholder booking handler
    console.log("Book Now clicked for court:", selectedCourt);
  };

  return (
    <Card className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl bg-gray-100">
        <Image
          src={court.imageUrl}
          alt={court.name}
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {court.badge && (
          <div className="absolute left-3 top-3">
            <Badge className="bg-emerald-500 text-white border-transparent shadow-md text-[10px] font-semibold uppercase tracking-widest">
              {court.badge}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-headline text-lg font-semibold tracking-tight text-secondary">
            {court.name}
          </h3>
          <span className="text-sm font-bold text-primary">{court.price}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          Premium lighting 
          

          locker access.
        </p>

        <div className="mt-2 flex gap-3">
          <Button
            className="flex-1 rounded-full text-sm font-semibold"
            onClick={() => handleBooking(court)}
          >
            Book Now
          </Button>

          <Link href={`/court/${court.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full rounded-full text-sm font-semibold"
            >
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
