import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import SubscriptionPlans from "@/components/SubscriptionPlans";

export default function SubscriptionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <SubscriptionPlans />
      </main>
      <Footer />
    </>
  );
}
