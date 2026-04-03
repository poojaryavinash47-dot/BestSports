
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Share2, Download, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id') || 'BK00000';

  return (
    <div className="max-w-xl mx-auto text-center space-y-8 py-12">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-primary blur-[40px] opacity-20 rounded-full"></div>
        <CheckCircle2 className="h-24 w-24 text-primary relative z-10" />
      </div>
      
      <div className="space-y-2">
        <h1 className="font-headline text-4xl font-bold tracking-tight">BOOKING SUCCESSFUL!</h1>
        <p className="text-muted-foreground">Your slot has been reserved. A confirmation message has been sent to your WhatsApp and Email.</p>
      </div>

      <div className="glass-card p-6 rounded-2xl border-dashed border-2 border-primary/20">
        <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1">Booking ID</p>
        <p className="text-4xl font-black text-white tracking-tighter">{bookingId}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 rounded-xl gap-2 font-bold">
          <Download className="h-4 w-4" /> RECEIPT
        </Button>
        <Button variant="outline" className="h-12 rounded-xl gap-2 font-bold">
          <Share2 className="h-4 w-4" /> SHARE
        </Button>
      </div>

      <div className="pt-8 border-t">
        <Link href="/dashboard">
          <Button className="w-full h-14 bg-primary text-primary-foreground font-black text-lg neon-glow-blue rounded-xl">
            GO TO DASHBOARD
          </Button>
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div className="text-primary font-bold">LOADING...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
