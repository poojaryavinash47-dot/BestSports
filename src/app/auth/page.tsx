"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.message || 'Invalid credentials');
        setIsLoading(false);
        return;
      }

      // on success redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="mb-8 flex flex-col items-center gap-1 z-10">
        <Link href="/" className="flex flex-col items-center">
          <span className="font-headline text-4xl font-black leading-none tracking-tighter text-foreground uppercase italic">
            BEST SHOT
          </span>
        </Link>
      </div>

      <Card className="w-full max-w-md glass-card border-none z-10 rounded-[2rem] overflow-hidden">
        <CardHeader className="p-6" />
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold uppercase text-[10px] tracking-widest">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="admin@example.com" className="pl-10 h-12 rounded-xl" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold uppercase text-[10px] tracking-widest">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" className="pl-10 h-12 rounded-xl" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="p-6">
            <Button className="w-full h-14 btn-orange font-black italic uppercase tracking-tighter text-lg rounded-2xl" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
