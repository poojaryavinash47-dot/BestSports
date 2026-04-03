"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Github } from "lucide-react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="mb-8 flex flex-col items-center gap-1 z-10">
        <Link href="/" className="flex flex-col items-center">
          <span className="font-headline text-4xl font-black leading-none tracking-tighter text-foreground uppercase italic">
            BEST SHOT
          </span>
          <span className="font-headline text-sm font-bold leading-none tracking-[0.4em] text-primary uppercase">
            CRICKET
          </span>
        </Link>
      </div>

      <Card className="w-full max-w-md glass-card border-none z-10 rounded-[2rem] overflow-hidden">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-t-xl h-14 bg-muted/50 p-1">
            <TabsTrigger value="login" className="rounded-2xl data-[state=active]:bg-secondary data-[state=active]:text-white font-black italic uppercase tracking-tighter">LOGIN</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-2xl data-[state=active]:bg-secondary data-[state=active]:text-white font-black italic uppercase tracking-tighter">SIGN UP</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="p-4">
            <CardHeader>
              <CardTitle className="font-headline text-2xl font-black uppercase italic tracking-tighter">Welcome Back</CardTitle>
              <CardDescription className="font-medium">Enter your credentials to access your dashboard.</CardDescription>
            </CardHeader>
            <form onSubmit={handleAuth}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold uppercase text-[10px] tracking-widest">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="name@example.com" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-bold uppercase text-[10px] tracking-widest">Password</Label>
                    <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-6">
                <Button className="w-full h-14 btn-orange font-black italic uppercase tracking-tighter text-lg rounded-2xl" disabled={isLoading}>
                  {isLoading ? "SIGNING IN..." : "SIGN IN"}
                </Button>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border"></span>
                  </div>
                  <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                    <span className="bg-card px-4 text-muted-foreground italic">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button variant="outline" className="h-12 rounded-xl font-bold italic tracking-tighter uppercase">
                    <Github className="mr-2 h-4 w-4" /> Github
                  </Button>
                  <Button variant="outline" className="h-12 rounded-xl font-bold italic tracking-tighter uppercase">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="p-4">
            <CardHeader>
              <CardTitle className="font-headline text-2xl font-black uppercase italic tracking-tighter">Create Account</CardTitle>
              <CardDescription className="font-medium">Join our community of athletes today.</CardDescription>
            </CardHeader>
            <form onSubmit={handleAuth}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold uppercase text-[10px] tracking-widest">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="John Doe" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="font-bold uppercase text-[10px] tracking-widest">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="name@example.com" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="font-bold uppercase text-[10px] tracking-widest">Create Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-password" type="password" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-14 btn-orange font-black italic uppercase tracking-tighter text-lg rounded-2xl" disabled={isLoading}>
                  {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
      
      <p className="mt-8 text-xs font-bold uppercase tracking-widest text-muted-foreground z-10 italic">
        By continuing, you agree to our <Link href="#" className="text-primary underline">Terms of Service</Link> and <Link href="#" className="text-primary underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}
