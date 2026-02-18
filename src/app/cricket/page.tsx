
"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Clock, Star, Filter } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const GROUNDS = [
  {
    id: "c1",
    name: "Eden Garden Arena",
    location: "Koramangala, Bangalore",
    price: 1200,
    rating: 4.8,
    type: "Full Pitch",
    image: "https://picsum.photos/seed/cricket1/600/400"
  },
  {
    id: "c2",
    name: "Lords Turf Center",
    location: "Indiranagar, Bangalore",
    price: 1500,
    rating: 4.9,
    type: "Box Cricket",
    image: "https://picsum.photos/seed/cricket2/600/400"
  },
  {
    id: "c3",
    name: "Wankhede Indoor Pitch",
    location: "HSR Layout, Bangalore",
    price: 1000,
    rating: 4.7,
    type: "Box Cricket",
    image: "https://picsum.photos/seed/cricket3/600/400"
  },
  {
    id: "c4",
    name: "Centurion Sports Complex",
    location: "Whitefield, Bangalore",
    price: 1800,
    rating: 4.6,
    type: "Full Pitch",
    image: "https://picsum.photos/seed/cricket4/600/400"
  }
];

export default function CricketPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <header className="bg-card py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="font-headline text-4xl font-bold mb-2">Cricket Grounds</h1>
              <p className="text-muted-foreground">Find and book the best cricket turfs and stadiums near you.</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
              <Button className="flex-1 md:flex-none bg-primary text-primary-foreground font-bold">
                Map View
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GROUNDS.map((ground) => (
            <Card key={ground.id} className="glass-card border-none overflow-hidden flex flex-col hover:border-primary/20 transition-all group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={ground.image} 
                  alt={ground.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {ground.rating}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    {ground.type}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="font-headline text-xl">{ground.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {ground.location}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Starting from</p>
                    <p className="text-2xl font-black text-primary">₹{ground.price}<span className="text-sm font-medium text-muted-foreground">/hr</span></p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" /> Available Today
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" /> 22 Players Max
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/book/cricket/${ground.id}`} className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground font-bold h-12 rounded-xl group-hover:neon-glow-blue transition-all">
                    BOOK NOW
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
