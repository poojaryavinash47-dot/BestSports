

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const cricketPlans = [
  {
    name: "Starter Cricket Plan",
    price: "₹4000/month",
    image: "/c1.png",
    features: [
      "Mon–Fri coaching",
      "1 hour session",
      "Batch timings included",
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
    name: "Advanced Training Plan",
    price: "₹20000/6 months",
    image: "/c2.png",
    features: [
      "2 hour sessions",
      "Skill development focus",
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
    name: "Elite Annual Plan",
    price: "₹30000/year",
    image: "/c3.png",
    features: [
      "Full access anytime",
      "Premium access",
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
  {
    name: "Weekend Warrior Plan",
    price: "₹2500/month",
    image: "/c1.png",
    features: [
      "Sat & Sun coaching",
    ],
    batchTimings: [
      "5:30 AM – 7:30 AM",
      "4:30 PM – 6:30 PM",
      "6:30 PM – 8:30 PM",
    ],
    theme: {
      bar: "bg-green-500",
      price: "text-green-600",
      button: "from-green-500 to-blue-400",
    },
    highlight: false,
  },
  {
    name: "Flexible Weekend Plan",
    price: "₹15000/6 months",
    image: "/c2.png",
    features: [
      "Flexible Sat & Sun",
    ],
    batchTimings: [
      "5:30 AM – 7:30 AM",
      "4:30 PM – 6:30 PM",
      "6:30 PM – 8:30 PM",
    ],
    theme: {
      bar: "bg-blue-400",
      price: "text-blue-600",
      button: "from-blue-400 to-green-400",
    },
    highlight: false,
  },
  {
    name: "Premium 3-Day Plan",
    price: "₹20000/year (Fri–Sun)",
    image: "/c3.png",
    features: [
      "Fri–Sun coaching",
    ],
    batchTimings: [
      "5:30 AM – 7:30 AM",
      "4:30 PM – 6:30 PM",
      "6:30 PM – 8:30 PM",
    ],
    theme: {
      bar: "bg-green-700",
      price: "text-green-800",
      button: "from-green-700 to-blue-700",
    },
    highlight: false,
  },
  {
    name: "Full Week Premium Plan",
    price: "₹35000/year",
    image: "/c3.png",
    features: [
      "Full week premium access",
    ],
    batchTimings: [
      "5:30 AM – 7:30 AM",
      "4:30 PM – 6:30 PM",
      "6:30 PM – 8:30 PM",
    ],
    theme: {
      bar: "bg-blue-700",
      price: "text-blue-800",
      button: "from-blue-700 to-green-800",
    },
    highlight: false,
  },
];

const badmintonPlans = [
  {
    name: "Badminton Coaching",
    price: "₹4000/month",
    image: "/b2.png",
    features: [
      "Mon–Fri",
      "Multiple batch timings",
    ],
    batchTimings: [
      "5–6 AM",
      "6–7 AM",
      "4:30–5:30 PM",
      "5–6 PM",
      "6–7 PM",
      "7–8 PM",
    ],
    theme: {
      bar: "bg-orange-500",
      price: "text-orange-700",
      button: "from-orange-500 to-purple-500",
    },
    highlight: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.12, duration: 0.5, type: "tween" } }),
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
    image: string;
    features: string[];
    batchTimings: string[];
    theme: {
      bar: string;
      price: string;
      button: string;
    };
    highlight?: boolean;
  };

  const renderPlanCard = (plan: Plan, idx: number) => (
    <motion.div
      key={plan.name}
      custom={idx}
      variants={fadeUp}
      whileHover={{ scale: plan.highlight ? 1.03 : 1.025 }}
      className={`relative flex flex-col rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-200 overflow-hidden min-h-[480px] ${plan.highlight ? 'scale-100 z-10 ring-2 ring-blue-400' : ''}`}
      style={plan.highlight ? { zIndex: 10 } : {}}
    >
      {/* Popular Badge */}
      {plan.highlight && (
        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Popular</div>
      )}
      {/* Top bar */}
      <div className={`h-2 w-full ${plan.theme.bar}`} />
      {/* Plan Image */}
      <div className="relative w-full h-40 flex-shrink-0">
        <Image src={plan.image} alt={plan.name} fill className="object-cover" priority />
      </div>
      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-1 text-gray-900 text-center">{plan.name}</h3>
        <div className="mb-2 flex items-end justify-center gap-2">
          <span className={`text-2xl font-bold ${plan.theme.price}`}>{plan.price}</span>
        </div>
        <ul className="mb-3 space-y-2 text-left mx-auto max-w-xs">
          {plan.features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="text-green-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              <span className="text-gray-800">{f}</span>
            </li>
          ))}
        </ul>
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-500 text-center mb-1">Batch Timings</div>
          <ul className="flex flex-wrap justify-center gap-2 text-xs">
            {plan.batchTimings.map((t: string, i: number) => (
              <li key={i} className="bg-gray-100 rounded px-2 py-1 text-gray-700 border border-gray-200">{t}</li>
            ))}
          </ul>
        </div>
        <button
          className={`mt-auto py-2.5 px-5 rounded-xl font-semibold text-white transition-all duration-200 bg-gradient-to-r ${plan.theme.button} focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          Select Plan
        </button>
      </div>
    </motion.div>
  );

  return (
    <section className="min-h-screen py-12 px-4 bg-gradient-to-br from-white via-blue-100 to-blue-900 font-sans">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-blue-900">Coaching Packages</h2>
        <p className="text-base text-blue-800/80 mb-2">Choose the perfect plan for your sports journey</p>
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 border-2 ${tab === 'cricket' ? 'bg-blue-600 text-white border-blue-700 shadow' : 'bg-white text-blue-700 border-blue-200'}`}
            onClick={() => setTab('cricket')}
          >
            Cricket Coaching Plans
          </button>
          <button
            className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 border-2 ${tab === 'badminton' ? 'bg-orange-500 text-white border-orange-600 shadow' : 'bg-white text-orange-600 border-orange-200'}`}
            onClick={() => setTab('badminton')}
          >
            Badminton Coaching Plans
          </button>
        </div>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{}}
      >
        {(tab === 'cricket' ? cricketPlans : badmintonPlans).map((plan, idx) => renderPlanCard(plan, idx))}
      </motion.div>
    </section>
  );
}
