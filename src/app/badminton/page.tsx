
"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Clock, Star, Filter, Shield } from "lucide-react";

const COURTS = [
  {
    id: "b1",
    name: "Olympic Badminton Hub",
    location: "Koramangala, Bangalore",
    price: 400,
    rating: 4.8,
    courts: 8,
    image: "https://picsum.photos/seed/badm1/600/400"
  },
  {
    id: "b2",
    name: "Prakash Padukone Academy",
    location: "Malleswaram, Bangalore",
    price: 600,
    rating: 5.0,
    courts: 12,
    image: "https://picsum.photos/seed/badm2/600/400"
  },
  {
    id: "b3",
    name: "Victor Smash Center",
    location: "HSR Layout, Bangalore",
    price: 350,
    rating: 4.6,
    courts: 6,
    image: "https://picsum.photos/seed/badm3/600/400"
  },
  {
    id: "b4",
    name: "Yonex Pro Courts",
    location: "Whitefield, Bangalore",
    price: 500,
    rating: 4.7,
    courts: 10,
    image: "https://picsum.photos/seed/badm4/600/400"
  }
];

export default function BadmintonPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <header className="bg-card py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="font-headline text-4xl font-bold mb-2">Badminton Courts</h1>
              <p className="text-muted-foreground">Professional wooden and synthetic indoor courts.</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
              <Button className="flex-1 md:flex-none bg-secondary text-secondary-foreground font-bold neon-glow-green">
                Near Me
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURTS.map((court) => (
            <Card key={court.id} className="glass-card border-none overflow-hidden flex flex-col hover:border-secondary/20 transition-all group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={court.image} 
                  alt={court.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {court.rating}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    Indoor Facility
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="font-headline text-xl">{court.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {court.location}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Starting from</p>
                    <p className="text-2xl font-black text-secondary">₹{court.price}<span className="text-sm font-medium text-muted-foreground">/hr</span></p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Shield className="h-3 w-3" /> Wooden Floor
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" /> {court.courts} Courts
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/book/badminton/${court.id}`} className="w-full">
                  <Button className="w-full bg-secondary text-secondary-foreground font-bold h-12 rounded-xl group-hover:neon-glow-green transition-all border-none">
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
