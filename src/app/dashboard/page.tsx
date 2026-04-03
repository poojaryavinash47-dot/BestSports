
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  History, 
  User, 
  CreditCard, 
  Settings, 
  LogOut, 
  MapPin, 
  Clock, 
  Trophy,
  ChevronRight,
  ExternalLink,
  Zap
} from "lucide-react";

export default function DashboardPage() {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    membership: "Gold",
    bookings: [
      { id: "BK10293", sport: "Cricket", venue: "Eden Garden Arena", date: "Oct 25, 2023", time: "06:00 PM", status: "Upcoming" },
      { id: "BK10294", sport: "Badminton", venue: "Olympic Hub", date: "Oct 22, 2023", time: "07:00 AM", status: "Completed" }
    ]
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-card/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 space-y-4">
              <Card className="glass-card border-none overflow-hidden">
                <div className="h-20 bg-primary/20"></div>
                <CardContent className="-mt-10 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-background border-4 border-card flex items-center justify-center text-3xl font-black text-primary mx-auto shadow-xl">
                    J
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                    <Trophy className="h-3 w-3" /> {user.membership} Member
                  </div>
                </CardContent>
              </Card>

              <nav className="flex flex-col gap-1">
                {[
                  { icon: <Calendar className="h-4 w-4" />, label: "My Bookings", active: true },
                  { icon: <History className="h-4 w-4" />, label: "Booking History" },
                  { icon: <CreditCard className="h-4 w-4" />, label: "Payments" },
                  { icon: <Settings className="h-4 w-4" />, label: "Profile Settings" },
                  { icon: <LogOut className="h-4 w-4" />, label: "Logout", destructive: true }
                ].map((item, idx) => (
                  <Button 
                    key={idx} 
                    variant="ghost" 
                    className={`justify-start gap-3 h-12 rounded-xl ${item.active ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''} ${item.destructive ? 'text-destructive hover:bg-destructive/10' : ''}`}
                  >
                    {item.icon} {item.label}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <Tabs defaultValue="bookings" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline text-3xl font-bold">User Dashboard</h2>
                  <TabsList className="glass-card bg-muted/50 p-1">
                    <TabsTrigger value="bookings">Upcoming</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="bookings" className="space-y-4 m-0">
                  {user.bookings.filter(b => b.status === 'Upcoming').map((booking) => (
                    <Card key={booking.id} className="glass-card border-none overflow-hidden hover:border-primary/20 transition-all">
                      <div className="flex flex-col md:flex-row">
                        <div className={`w-2 md:w-3 ${booking.sport === 'Cricket' ? 'bg-primary' : 'bg-secondary'}`}></div>
                        <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest bg-muted px-2 py-0.5 rounded">
                                {booking.sport}
                              </span>
                              <span className="text-xs text-muted-foreground">ID: {booking.id}</span>
                            </div>
                            <h4 className="font-bold text-xl">{booking.venue}</h4>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {booking.date}</span>
                              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {booking.time}</span>
                              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Koramangala</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full md:w-auto">
                            <Button variant="outline" className="flex-1 md:flex-none border-destructive text-destructive hover:bg-destructive/10">CANCEL</Button>
                            <Button className="flex-1 md:flex-none bg-primary text-primary-foreground font-bold">VIEW RECEIPT</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="history" className="space-y-4 m-0">
                  <Card className="glass-card border-none">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>A list of your past bookings and payments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {user.bookings.filter(b => b.status === 'Completed').map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                                <History className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-bold">{booking.venue}</p>
                                <p className="text-xs text-muted-foreground">{booking.date} • {booking.time}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">₹{booking.sport === 'Cricket' ? '1200' : '400'}</p>
                              <p className="text-[10px] font-black uppercase text-green-500">PAID</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Stats / Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card className="glass-card border-none bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <Trophy className="h-8 w-8 text-primary" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Gold Status</span>
                    </div>
                    <h3 className="text-3xl font-black">15%</h3>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Member Discount Active</p>
                  </CardContent>
                </Card>
                <Card className="glass-card border-none">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black">24</h3>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Hours Played Total</p>
                  </CardContent>
                </Card>
                <Card className="glass-card border-none bg-secondary/5">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <Zap className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-3xl font-black">120</h3>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Play Points Earned</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
