
"use client";


import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import MembershipPlans from '@/components/MembershipPlans';

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <MembershipPlans />
      </main>
      <Footer />
    </>
  );
}

