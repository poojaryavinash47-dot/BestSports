"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Clock, Star, Filter } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <header className="bg-secondary py-16 border-b border-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter uppercase italic">Cricket Arenas</h1>
              <p className="text-blue-100 text-lg max-w-xl font-medium">Book the finest floodlit turfs and professional pitches for your next tournament.</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none gap-2 bg-white/10 border-white/20 text-white hover:bg-white hover:text-secondary font-bold h-12 rounded-full px-6">
                <Filter className="h-4 w-4" /> Filters
              </Button>
              <Button className="flex-1 md:flex-none btn-orange font-black h-12 rounded-full px-8 tracking-tighter italic">
                FIND NEAR ME
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {GROUNDS.map((ground) => (
            <Card key={ground.id} className="glass-card border-none overflow-hidden flex flex-col hover:shadow-2xl transition-all group rounded-[2rem]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={ground.image} 
                  alt={ground.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-lg text-secondary">
                  <Star className="h-3 w-3 fill-primary text-primary" /> {ground.rating}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-secondary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {ground.type}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="font-headline text-2xl font-black text-secondary uppercase italic tracking-tighter">{ground.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <MapPin className="h-4 w-4 text-primary" /> {ground.location}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex justify-between items-center pt-6 border-t border-secondary/5 mt-4">
                  <div className="space-y-0">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Rate per hour</p>
                    <p className="text-3xl font-black text-secondary tracking-tighter">₹{ground.price}<span className="text-sm font-bold text-muted-foreground">/hr</span></p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center justify-end gap-1 text-[10px] text-green-500 font-black uppercase tracking-widest">
                      <Clock className="h-3 w-3" /> Booking Open
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      <Users className="h-3 w-3" /> Max 22
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-8 px-8">
                <Link href={`/book/cricket/${ground.id}`} className="w-full">
                  <Button className="w-full btn-orange font-black h-14 rounded-2xl group-hover:scale-[1.02] transition-all text-lg tracking-tighter italic uppercase">
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
