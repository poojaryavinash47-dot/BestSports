"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MembershipBookingForm({ plan, onSuccess }: { plan: { name: string; price: string; theme: { button: string } }, onSuccess: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    startDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName) newErrors.fullName = "Full Name is required";
    if (!form.phone) newErrors.phone = "Phone Number is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.startDate) newErrors.startDate = "Select a start date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Razorpay integration
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const amountMatch = plan.price.replace(/[^\d]/g, "");
      const amount = parseInt(amountMatch || "1000", 10) * 100; // in paise
      const options = {
        key: 'rzp_test_SFWS45gPercdHp',
        amount,
        currency: 'INR',
        name: plan.name,
        description: 'Membership Payment',
        handler: async function () {
          // Store booking in DB after payment
          try {
            await fetch("/api/membership/bookings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fullName: form.fullName,
                phone: form.phone,
                email: form.email,
                startDate: form.startDate,
                notes: form.notes,
                planName: plan.name,
                planPrice: plan.price,
              }),
            });
          } catch (e) {}
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            onSuccess();
          }, 2000);
          setForm({
            fullName: "",
            phone: "",
            email: "",
            startDate: "",
            notes: "",
          });
          setErrors({});
        },
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: '#6366f1',
        },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return (
    <motion.form layout className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-semibold border border-green-300">
          Membership booking successful! Thank you.
        </div>
      )}
      <div>
        <label className="block text-xs font-semibold mb-0.5 text-gray-700">Full Name<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
          placeholder="Enter your name"
        />
        {errors.fullName && <p className="text-xs text-red-500 mt-0.5">{errors.fullName}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold mb-0.5 text-gray-700">Phone Number<span className="text-red-500">*</span></label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold mb-0.5 text-gray-700">Email<span className="text-red-500">*</span></label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold mb-0.5 text-gray-700">Select Start Date<span className="text-red-500">*</span></label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          min={(() => {
            const d = new Date();
            d.setDate(d.getDate() + 2);
            return d.toISOString().split("T")[0];
          })()}
          className="w-full rounded-md border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
        />
        {errors.startDate && <p className="text-xs text-red-500 mt-0.5">{errors.startDate}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold mb-0.5 text-gray-700">Notes (optional)</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm min-h-[40px] max-h-[80px]"
          placeholder="Any additional notes"
        />
      </div>
      <button
        type="submit"
        className={`mt-2 w-full py-2 rounded-md text-white font-semibold shadow bg-gradient-to-r ${plan.theme.button} hover:opacity-90 transition text-base`}
      >
        Confirm Booking
      </button>
    </motion.form>
  );
}
