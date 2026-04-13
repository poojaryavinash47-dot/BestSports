

"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const MembershipBookingForm = dynamic(() => import("./MembershipBookingForm"), { ssr: false });
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";

const cricketPlans = [
  {
    name: "Basic",
    price: "₹4000/month",
    image: "/c1.png",
    features: [
      "Mon–Fri coaching",
      "1 hour session",
      "Batch timings included",
      "No benefits",
      "No discounts on bookings",
    ],
    batchTimings: [
      "5:30 AM – 7:30 AM",
      "4:30 PM – 6:30 PM",
      "6:30 PM – 8:30 PM",
    ],
    theme: {
      bar: "bg-blue-500",
      price: "text-blue-700",
      button: "from-blue-500 to-green-500",
    },
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹20000/6 months",
    image: "/c2.png",
    features: [
      "2 hour sessions",
      "Skill development focus",
      "No benefits",
      "No discounts on bookings",
    ],
    batchTimings: [
      "5:30 AM – 7:30 AM",
      "4:30 PM – 6:30 PM",
      "6:30 PM – 8:30 PM",
    ],
    theme: {
      bar: "bg-green-600",
      price: "text-green-700",
      button: "from-green-600 to-blue-500",
    },
    highlight: false,
  },
  {
    name: "Elite",
    price: "₹30000/year",
    image: "/c3.png",
    features: [
      "Full access anytime",
      "Premium access",
      "No benefits",
      "No discounts on bookings",
    ],
    batchTimings: [
      "5:30 AM – 7:30 AM",
      "4:30 PM – 6:30 PM",
      "6:30 PM – 8:30 PM",
    ],
    theme: {
      bar: "bg-blue-900",
      price: "text-blue-900",
      button: "from-blue-900 to-green-700",
    },
    highlight: true,
  },
];

const badmintonPlans = [
  {
    name: "Monthly Plan",
    price: "₹6,600",
    duration: "1 Month",
    image: "/b2.png",
    features: [
      "Court access",
      "Flexible timings",
      "Coaching support",
      "No benefits",
      "No discounts on bookings",
    ],
    theme: {
      bar: "bg-orange-500",
      price: "text-orange-700",
      button: "from-orange-500 to-purple-500",
    },
    highlight: false,
    badge: null,
  },
  {
    name: "3 Months Plan",
    price: "₹18,150",
    duration: "3 Months",
    image: "/b2.png",
    features: [
      "Court access",
      "Flexible timings",
      "Coaching support",
      "No benefits",
      "No discounts on bookings",
    ],
    theme: {
      bar: "bg-orange-500",
      price: "text-orange-700",
      button: "from-orange-500 to-purple-500",
    },
    highlight: false,
    badge: null,
  },
  {
    name: "6 Months Plan",
    price: "₹33,000",
    duration: "6 Months",
    image: "/b2.png",
    features: [
      "Court access",
      "Flexible timings",
      "Coaching support",
      "No benefits",
      "No discounts on bookings",
    ],
    theme: {
      bar: "bg-orange-500",
      price: "text-orange-700",
      button: "from-orange-500 to-purple-500",
    },
    highlight: true,
    badge: "Best Value",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + (i as number) * 0.12, duration: 0.5, type: "tween" }
  }),
};


function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  // Auto-slide every 3.5s
  React.useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="relative w-full h-40 flex-shrink-0">
      <AnimatePresence initial={false}>
        <motion.div
          key={images[idx]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image src={images[idx]} alt={alt} fill className="object-cover" priority />
        </motion.div>
      </AnimatePresence>
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-200 border border-white/70 ${i === idx ? 'bg-blue-500 scale-125 shadow' : 'bg-white/60'}`}
            onClick={() => setIdx(i)}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SubscriptionPlans() {
  const [tab, setTab] = useState<'cricket' | 'badminton'>("cricket");

  type Plan = {
    name: string;
    price: string;
    duration?: string;
    image: string;
    features: string[];
    theme: {
      bar: string;
      price: string;
      button: string;
    };
    highlight?: boolean;
    badge?: string | null;
  };

  const renderPlanCard = (plan: Plan, idx: number) => (
    <motion.div
      key={plan.name}
      custom={idx}
      variants={fadeUp}
      whileHover={{ scale: plan.highlight ? 1.03 : 1.025 }}
      className={`relative flex flex-col rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-200 overflow-hidden min-h-[420px] max-w-sm w-full mx-auto ${plan.highlight ? 'scale-100 z-10 ring-2 ring-orange-400' : ''}`}
      style={plan.highlight ? { zIndex: 10 } : {}}
    >
      {/* Badge for Best Value or Popular */}
      {plan.badge && (
        <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-bold shadow">{plan.badge}</div>
      )}
      {/* Top bar */}
      <div className={`h-2 w-full ${plan.theme.bar}`} />
      {/* Plan Image */}
      <div className="relative w-full h-40 flex-shrink-0">
        <Image src={plan.image} alt={plan.name} fill className="object-cover" priority />
      </div>
      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-bold mb-1 text-gray-900 text-center">{plan.name}</h3>
        {plan.duration && <div className="text-xs text-gray-500 mb-1 text-center">{plan.duration}</div>}
        <div className="mb-2 flex items-end justify-center gap-2">
          <span className={`text-2xl font-extrabold ${plan.theme.price}`}>{plan.price}</span>
        </div>
        <ul className="mb-4 space-y-2 text-left mx-auto max-w-xs">
          {plan.features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="text-green-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              <span className="text-gray-800">{f}</span>
            </li>
          ))}
        </ul>
        <button
          className={`mt-auto py-2.5 px-5 rounded-xl font-bold text-white transition-all duration-200 bg-gradient-to-r ${plan.theme.button} focus:outline-none focus:ring-2 focus:ring-offset-2`}
          onClick={() => {
            setSelectedPlan(plan);
            setModalOpen(true);
          }}
        >
          Select Plan
        </button>
      </div>
    </motion.div>
  );

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <>
      <section className="min-h-screen py-12 px-4 bg-blue-600 font-sans">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 border-2 ${tab === 'cricket' ? 'bg-blue-600 text-white border-blue-700 shadow' : 'bg-white text-blue-700 border-blue-200'}`}
              onClick={() => setTab('cricket')}
            >
              Cricket Membership Plans
            </button>
            <button
              className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 border-2 ${tab === 'badminton' ? 'bg-orange-500 text-white border-orange-600 shadow' : 'bg-white text-orange-600 border-orange-200'}`}
              onClick={() => setTab('badminton')}
            >
              Badminton Membership Plans
            </button>
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl gap-6 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{}}
        >
          {(tab === 'cricket' ? cricketPlans : badmintonPlans).map((plan, idx) => renderPlanCard(plan, idx))}
        </motion.div>
      </section>
      {modalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 rounded-xl bg-white shadow-xl p-4 md:p-6 flex flex-col gap-3 min-h-[420px] max-h-[90vh] overflow-y-auto no-scrollbar border border-gray-100">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              type="button"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-0 tracking-tight text-center">Book Membership: {selectedPlan.name}</h2>
            <div className="flex items-center gap-1 justify-center mb-1">
              <span className="font-semibold text-blue-700 text-base md:text-lg">{selectedPlan.price}</span>
            </div>
            <MembershipBookingForm plan={selectedPlan} onSuccess={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
