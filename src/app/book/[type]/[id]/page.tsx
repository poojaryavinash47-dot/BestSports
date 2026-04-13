"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, Info, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SLOTS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", 
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

export default function BookingPage({ params }: { params: Promise<{ type: string, id: string }> }) {
  const { type, id } = use(params);
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [duration, setDuration] = useState<string>("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Mock data based on type
  const isCricket = type === 'cricket';
  const pricePerHour = isCricket ? 1200 : 400;
  const totalAmount = pricePerHour * parseInt(duration);
  const discount = 0; // membership would apply here
  const finalAmount = totalAmount - discount;

  const handleBooking = async () => {
    if (!selectedSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a time slot to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    // Simulate Razorpay payment
    setTimeout(async () => {
      // Send booking data to backend
      try {
        const res = await fetch('/api/admin/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sport: isCricket ? 'cricket' : 'badminton',
            venue: isCricket ? 'Eden Garden Arena' : 'Olympic Badminton Hub',
            date: date?.toISOString().split('T')[0],
            time: selectedSlot,
            status: 'confirmed',
            // Add more fields if needed
          })
        });
        if (res.ok) {
          const data = await res.json();
          setBookingId(data.id);
          setShowSuccessDialog(true);
        } else {
          toast({ title: "Booking Failed", description: "Could not save booking.", variant: "destructive" });
        }
      } catch (e) {
        toast({ title: "Booking Failed", description: "Network error.", variant: "destructive" });
      }
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Selection */}
            <div className="flex-[2] space-y-8">
              <div className="space-y-4">
                <h1 className="font-headline text-3xl font-bold">
                  {isCricket ? 'Eden Garden Arena' : 'Olympic Badminton Hub'}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                    {isCricket ? 'CRICKET' : 'BADMINTON'}
                  </span>
                  <span>Koramangala, Bangalore</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date Selection */}
                <Card className="glass-card border-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary" /> SELECT DATE
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border-none"
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </CardContent>
                </Card>

                {/* Slot Selection */}
                <Card className="glass-card border-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" /> SELECT TIME SLOT
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-2">
                      {SLOTS.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedSlot === slot ? "default" : "outline"}
                          size="sm"
                          className={`text-[10px] h-9 ${selectedSlot === slot ? 'bg-primary text-primary-foreground font-bold' : ''}`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <Label className="text-xs font-bold">DURATION (HOURS)</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Hour</SelectItem>
                          <SelectItem value="2">2 Hours</SelectItem>
                          <SelectItem value="3">3 Hours</SelectItem>
                          <SelectItem value="4">4 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Information / Perks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-primary/10 bg-primary/5 flex gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Professional Quality</h4>
                    <p className="text-xs text-muted-foreground">High grade turf and floodlights maintained weekly.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-secondary/10 bg-secondary/5 flex gap-3">
                  <CreditCard className="h-6 w-6 text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Secure Payment</h4>
                    <p className="text-xs text-muted-foreground">End-to-end encrypted payments via Razorpay.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="flex-1">
              <Card className="glass-card border-none sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Price ({duration} hr)</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (GST 18%)</span>
                      <span>₹{Math.round(totalAmount * 0.18)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-500 font-bold">
                      <span>Discount</span>
                      <span>- ₹{discount}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-headline text-lg font-bold">Total Amount</span>
                      <span className="text-2xl font-black text-primary">₹{Math.round(finalAmount * 1.18)}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted text-[10px] flex gap-2 text-muted-foreground">
                    <Info className="h-4 w-4 shrink-0" />
                    <p>Cancellation policy: Get 100% refund if cancelled 12 hours before slot time. No refund within 12 hours.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full h-14 bg-primary text-primary-foreground font-black text-lg neon-glow-blue tracking-tighter"
                    disabled={isProcessing}
                    onClick={handleBooking}
                  >
                    {isProcessing ? "PROCESSING..." : "PROCEED TO PAY"}
                    {!isProcessing && <ChevronRight className="ml-2 h-5 w-5" />}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {showSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-black/10">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Booking successful</h2>
              <p className="mt-2 text-sm text-muted-foreground">Your payment was completed successfully. Please contact us for more information.</p>
            </div>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              {bookingId && <p className="font-medium">Booking ID: {bookingId}</p>}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button onClick={() => setShowSuccessDialog(false)} className="w-full sm:w-auto bg-primary text-white">
                Close
              </Button>
              <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-xl border border-secondary px-4 py-3 text-sm font-black uppercase tracking-[0.3em] text-secondary hover:bg-secondary/10 sm:w-auto">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
