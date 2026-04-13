
"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { CourtCard } from "@/components/CourtCard";
import type { Court } from "@/components/CourtCard";
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

  const badmintonCourts: Court[] = [
    {
      id: "b1",
      name: "Premium Hybrid Court 1",
      price: "₹450 (5am-12pm), ₹400 (12pm-4pm), ₹499 (4pm-11pm)",
      badge: "Available",
      imageUrl:
        "/b1.png",
      href: "/book/badminton/1",
    },
    {
      id: "b2",
      name: "Premium Hybrid Court 2",
      price: "₹450/hour",
      badge: "Prime Slot",
      imageUrl:
        "/b2.png",
      href: "/book/badminton/2",
    },
    {
      id: "b3",
      name: "Premium Hybrid Court 3",
      price: "₹350/hour",
      badge: "Available",
      imageUrl:
        "/b3.png",
      href: "/book/badminton/3",
    },
    {
      id: "b4",
      name: "Premium Hybrid Court 4",
      price: "₹350/hour",
      badge: "Available",
      imageUrl:
        "/b4.png",
      href: "/book/badminton/4",
    },
    {
      id: "b5",
      name: "Premium Hybrid Court 5",
      price: "₹500/hour",
      badge: "Popular",
      imageUrl:
        "/b5.png",
      href: "/book/badminton/5",
    },
    
  ];

  const cricketCourts: Court[] = [
    {
      id: "c1",
      name: "Premium Hybrid Court 1",
      price: "₹450 (5am-12pm), ₹400 (12pm-4pm), ₹499 (4pm-11pm)",
      badge: "Available",
      imageUrl:
        "/c1.png",
      href: "/book/cricket/1",
    },
    {
      id: "c2",
      name: "Premium Hybrid Court 2",
      price: "₹450 (5am-12pm), ₹400 (12pm-4pm), ₹499 (4pm-11pm)",
      badge: "Prime Slot",
      imageUrl:
        "/c2.png",
      href: "/book/cricket/2",
    },
    {
      id: "c3",
      name: "Premium Hybrid Court 3",
      price: "₹450 (5am-12pm), ₹400 (12pm-4pm), ₹499 (4pm-11pm)",
      badge: "Popular",
      imageUrl:
        "/c3.png",
      href: "/book/cricket/3",
    },
    {
      id: "c4",
      name: "Premium Hybrid Court 4",
      price: "₹450 (5am-12pm), ₹400 (12pm-4pm), ₹499 (4pm-11pm)",
      badge: "Available",
      imageUrl:
        "/c1.png",
      href: "/book/cricket/4",
    },
    {
      id: "c5",
      name: "Premium Hybrid Court 5",
      price: "₹450 (5am-12pm), ₹400 (12pm-4pm), ₹499 (4pm-11pm)",
      badge: "Floodlights",
      imageUrl:
        "/c2.png",
      href: "/book/cricket/5",
    },
    {
      id: "c6",
      name: "Premium Hybrid Court 6",
      price: "₹450 (5am-12pm), ₹400 (12pm-4pm), ₹499 (4pm-11pm)",
      badge: "Available",
      imageUrl:
        "/c3.png",
      href: "/book/cricket/6",
    },
  ];

  const packagePreviews = [
    { id: 'p1', brand: 'BestSports', title: 'BASIC', subtitle: 'Mon–Fri coaching · 1 hour session · Batch timings included', titleColor: 'text-slate-200' },
    { id: 'p2', brand: 'BestSports', title: 'PRO', subtitle: '2 hour sessions · Skill development focus', titleColor: 'text-slate-200' },
    { id: 'p3', brand: 'BestSports', title: 'ELITE', subtitle: 'Unlimited access to group classes, all centers and at-home workouts', titleColor: 'text-amber-300' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-8 md:py-14 flex items-center justify-center overflow-hidden min-h-[220px]">
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
            
            <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-tight">
              BOOK YOUR COURT <br />
              <span className="text-primary not-italic">PLAY LIKE A PRO.</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-blue-50 text-sm md:text-base font-medium mt-3 mb-6">
              Experience world-class sports infrastructure with instant booking, professional maintenance, and elite club perks.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a href="#cricket-courts" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 font-black text-lg rounded-xl btn-orange w-full sm:min-w-[220px]">
                  BOOK CRICKET
                </Button>
              </a>
              <a href="#badminton-courts" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 font-black text-lg rounded-xl btn-orange w-full sm:min-w-[220px]">
                  BOOK BADMINTON
                </Button>
              </a>
            </div>

            {/* Small package previews inside hero */}
            <div className="mt-20 md:mt-24 w-full relative z-20">
              <div className="container mx-auto px-4">
                <div className="relative">
                  {/* centered cards */}
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch w-full">
                      {packagePreviews.map((p, i) => (
                        <div
                          key={p.id}
                          className={`flex flex-col items-center justify-center text-center rounded-xl p-4 sm:p-6 shadow-md border border-white/5 bg-slate-900 text-white w-[90vw] max-w-[260px] md:min-w-[300px] md:max-w-[320px] ${i === 2 ? 'ml-0 md:ml-6' : ''}`}
                        >
                          <div className="text-xs tracking-widest uppercase opacity-70 mb-3">{p.brand}</div>
                          <div className={`text-2xl md:text-4xl font-black tracking-tight mb-3 ${p.titleColor || ''}`}>{p.title}</div>
                          <div className="text-sm text-muted-foreground max-w-xs">{p.subtitle}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                <div className="mt-6 text-center">
                  <Link href="/subscriptions">
                    <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg px-6 py-2">Explore more packages</Button>
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Cricket Courts (moved up) */}
      <section id="cricket-courts" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-secondary uppercase italic">
                Cricket Courts
              </h2>
              <p className="text-muted-foreground text-sm md:text-base font-medium">
                Turf and matting wickets maintained weekly for serious cricket.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cricketCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        </div>
      </section>

      {/* Badminton Courts (moved up) */}
      <section id="badminton-courts" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-secondary uppercase italic">
                Badminton Courts
              </h2>
              <p className="text-muted-foreground text-sm md:text-base font-medium">
                High-grip indoor courts with pro-grade lighting and perfect bounce.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {badmintonCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sports */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="font-headline text-4xl font-black tracking-tight text-secondary uppercase italic">Our Facilities</h2>
                <p className="text-muted-foreground font-medium">Professional grade arenas for serious athletes.</p>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5 mt-4">
                <li className="leading-6">24/7 CCTV surveillance</li>
                <li className="leading-6">Secure entry & exit monitoring</li>
                <li className="leading-6">On-site staff supervision</li>
                <li className="leading-6">Safe environment for players & visitors</li>
                <li className="leading-6">Clean drinking water facility</li>
                <li className="leading-6">Well-maintained rest & waiting areas</li>
                <li className="leading-6">Changing rooms & washrooms</li>
                <li className="leading-6">Ample parking space</li>
                <li className="leading-6">Continuous power backup & lighting</li>
                <li className="leading-6">Hygienic and well-maintained premises</li>
              </ul>
            </div>
            <Link href="/membership">
              <Button variant="link" className="text-secondary font-bold group gap-2">
                VIEW MEMBERSHIPS <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/gallery">
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

            <Link href="/gallery">
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
                  <h3 className="font-headline text-4xl font-black text-white uppercase italic tracking-tighter">Badminton Courts</h3>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Navbar } from "@/components/navbar";
// import { Footer } from "@/components/footer";
// import { Card } from "@/components/ui/card";
// import { CourtCard } from "@/components/CourtCard";
// import type { Court } from "@/components/CourtCard";
// import { 
//   Calendar, 
//   Clock, 
//   ShieldCheck, 
//   Zap, 
//   ArrowRight,
//   Trophy
// } from "lucide-react";
// import { PlaceHolderImages } from "@/lib/placeholder-images";

// export default function Home() {
//   const cricketHero = PlaceHolderImages.find(img => img.id === 'cricket-hero');
//   const badmintonHero = PlaceHolderImages.find(img => img.id === 'badminton-hero');

//   const badmintonCourts: Court[] = [
//     {
//       id: "b1",
//       name: "Elite Indoor Court 1",
//       price: "₹400/hour",
//       badge: "Available",
//       imageUrl:
//         "/b1.png",
//       href: "/book/badminton/1",
//     },
//     {
//       id: "b2",
//       name: "Elite Indoor Court 2",
//       price: "₹450/hour",
//       badge: "Prime Slot",
//       imageUrl:
//         "/b2.png",
//       href: "/book/badminton/2",
//     },
//     {
//       id: "b3",
//       name: "Training Court A",
//       price: "₹350/hour",
//       badge: "Available",
//       imageUrl:
//         "/b3.png",
//       href: "/book/badminton/3",
//     },
//     {
//       id: "b4",
//       name: "Training Court B",
//       price: "₹350/hour",
//       badge: "Available",
//       imageUrl:
//         "/b4.png",
//       href: "/book/badminton/4",
//     },
//     {
//       id: "b5",
//       name: "Club Court 1",
//       price: "₹500/hour",
//       badge: "Popular",
//       imageUrl:
//         "/b5.png",
//       href: "/book/badminton/5",
//     },
//     {
//       id: "b6",
//       name: "Club Court 2",
//       price: "₹500/hour",
//       badge: "Available",
//       imageUrl:
//         "/b1.png",
//       href: "/book/badminton/6",
//     },
//   ];

//   const cricketCourts: Court[] = [
//     {
//       id: "c1",
//       name: "Pro Turf Arena 1",
//       price: "₹1,200/hour",
//       badge: "Available",
//       imageUrl:
//         "/c1.png",
//       href: "/book/cricket/1",
//     },
//     {
//       id: "c2",
//       name: "Pro Turf Arena 2",
//       price: "₹1,300/hour",
//       badge: "Prime Slot",
//       imageUrl:
//         "/c2.png",
//       href: "/book/cricket/2",
//     },
//     {
//       id: "c3",
//       name: "Weekend League Ground",
//       price: "₹1,500/hour",
//       badge: "Popular",
//       imageUrl:
//         "/c3.png",
//       href: "/book/cricket/3",
//     },
//     {
//       id: "c4",
//       name: "Academy Practice Ground",
//       price: "₹1,000/hour",
//       badge: "Available",
//       imageUrl:
//         "/c1.png",
//       href: "/book/cricket/4",
//     },
//     {
//       id: "c5",
//       name: "Night Match Arena",
//       price: "₹1,800/hour",
//       badge: "Floodlights",
//       imageUrl:
//         "/c2.png",
//       href: "/book/cricket/5",
//     },
//     {
//       id: "c6",
//       name: "Corporate League Ground",
//       price: "₹1,600/hour",
//       badge: "Available",
//       imageUrl:
//         "/c3.png",
//       href: "/book/cricket/6",
//     },
//   ];

//   const packagePreviews = [
//     { id: 'p1', brand: 'BestSports', title: 'Starter Cricket Plan', subtitle: 'Mon–Fri coaching · 1 hour session · Batch timings included', titleColor: 'text-slate-200' },
//     { id: 'p2', brand: 'BestSports', title: 'Advanced Training Plan', subtitle: '2 hour sessions · Skill development focus', titleColor: 'text-slate-200' },
//     { id: 'p3', brand: 'BestSports', title: 'ELITE', subtitle: 'Unlimited access to group classes, all centers and at-home workouts', titleColor: 'text-amber-300' },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-background">
//       <Navbar />
      
//       {/* Hero Section */}
//       <section className="relative py-8 md:py-14 flex items-center justify-center overflow-hidden min-h-[220px]">
//         <div className="absolute inset-0 z-0">
//           <Image 
//             src={cricketHero?.imageUrl || "https://picsum.photos/seed/stadium/1200/600"} 
//             alt="Cricket Ground" 
//             fill 
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-background"></div>
//         </div>

//         <div className="container mx-auto px-4 z-10 text-white">
//           <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-sm">
//               <Trophy className="h-4 w-4 text-primary" /> 
//               <span>Bangalore's Premier Sports Network</span>
//             </div>
            
//             <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-tight">
//               BOOK YOUR COURT <br />
//               <span className="text-primary not-italic">PLAY LIKE A PRO.</span>
//             </h1>
            
//             <p className="max-w-xl mx-auto text-blue-50 text-sm md:text-base font-medium mt-3 mb-6">
//               Experience world-class sports infrastructure with instant booking, professional maintenance, and elite club perks.
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
//               <Link href="/cricket" className="w-full sm:w-auto">
//                 <Button size="lg" className="h-14 px-8 font-black text-lg rounded-xl btn-orange w-full sm:min-w-[220px]">
//                   BOOK CRICKET
//                 </Button>
//               </Link>
//               <Link href="/badminton" className="w-full sm:w-auto">
//                 <Button size="lg" className="h-14 px-8 font-black text-lg rounded-xl btn-orange w-full sm:min-w-[220px]">
//                   BOOK BADMINTON
//                 </Button>
//               </Link>
//             </div>

//             {/* Small package previews inside hero */}
//             <div className="mt-20 md:mt-24 w-full relative z-20">
//               <div className="container mx-auto px-4 pr-24 md:pr-36">
//                 <div className="relative">
//                   {/* centered cards */}
//                   <div className="flex items-center justify-center">
//                     <div className="flex gap-6">
//                       {packagePreviews.map((p, i) => (
//                         <div
//                           key={p.id}
//                           className={`flex flex-col items-center justify-center text-center rounded-xl p-6 shadow-md border border-white/5 bg-slate-900 text-white min-w-[260px] md:min-w-[300px] ${i === 2 ? 'ml-3 md:ml-6' : ''}`}
//                         >
//                           <div className="text-xs tracking-widest uppercase opacity-70 mb-3">{p.brand}</div>
//                           <div className={`text-3xl md:text-4xl font-black tracking-tight mb-3 ${p.titleColor || ''}`}>{p.title}</div>
//                           <div className="text-sm text-muted-foreground max-w-xs">{p.subtitle}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                 <div className="mt-6 text-center">
//                   <Link href="/membership">
//                     <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg px-6 py-2">Explore more packages</Button>
//                   </Link>
//                 </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

      

//       {/* Cricket Courts (moved up) */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
//             <div className="space-y-2">
//               <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-secondary uppercase italic">
//                 Cricket Courts
//               </h2>
//               <p className="text-muted-foreground text-sm md:text-base font-medium">
//                 Turf and matting wickets maintained weekly for serious cricket.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {cricketCourts.map((court) => (
//               <CourtCard key={court.id} court={court} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Badminton Courts (moved up) */}
//       <section className="py-24 bg-slate-50">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
//             <div className="space-y-2">
//               <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-secondary uppercase italic">
//                 Badminton Courts
//               </h2>
//               <p className="text-muted-foreground text-sm md:text-base font-medium">
//                 High-grip indoor courts with pro-grade lighting and perfect bounce.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {badmintonCourts.map((court) => (
//               <CourtCard key={court.id} court={court} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Sports */}
//       <section className="py-24 bg-slate-50">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
//             <div className="space-y-2">
//               <h2 className="font-headline text-4xl font-black tracking-tight text-secondary uppercase italic">Our Facilities</h2>
//               <p className="text-muted-foreground font-medium">Professional grade arenas for serious athletes.</p>
//             </div>
//             <Link href="/membership">
//               <Button variant="link" className="text-secondary font-bold group gap-2">
//                 VIEW MEMBERSHIPS <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <Link href="/cricket">
//               <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer shadow-xl rounded-[2rem]">
//                 <Image 
//                   src={cricketHero?.imageUrl || "https://picsum.photos/seed/cricket/800/500"} 
//                   alt="Cricket" 
//                   fill 
//                   className="object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 p-8 w-full">
//                   <span className="text-white bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Pro Turf</span>
//                   <h3 className="font-headline text-4xl font-black text-white uppercase italic tracking-tighter">Cricket Arenas</h3>
//                 </div>
//               </Card>
//             </Link>

//             <Link href="/badminton">
//               <Card className="group relative overflow-hidden border-none aspect-[16/9] cursor-pointer shadow-xl rounded-[2rem]">
//                 <Image 
//                   src={badmintonHero?.imageUrl || "https://picsum.photos/seed/badminton/800/500"} 
//                   alt="Badminton" 
//                   fill 
//                   className="object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 p-8 w-full">
//                   <span className="text-white bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Olympic Standard</span>
//                   <h3 className="font-headline text-4xl font-black text-white uppercase italic tracking-tighter">Indoor Courts</h3>
//                 </div>
//               </Card>
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }