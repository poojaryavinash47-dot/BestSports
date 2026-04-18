"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

function planDurationMonths(price: string): number {
  const p = (price || '').toLowerCase();
  if (/6\s*months?/.test(p)) return 6;
  if (/3\s*months?/.test(p)) return 3;
  if (/2\s*months?/.test(p)) return 2;
  if (/year|yearly|annual|12\s*months?/.test(p)) return 12;
  return 1;
}

function calcEndDate(startDate: string, price: string): string {
  if (!startDate) return '';
  const d = new Date(startDate);
  if (isNaN(d.getTime())) return '';
  d.setMonth(d.getMonth() + planDurationMonths(price));
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

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
          }, 3000);
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
    <motion.form layout className="relative flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      {success && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl ring-1 ring-black/10">
            <h3 className="text-xl font-bold text-gray-900">Booking successful</h3>
            <p className="mt-2 text-sm text-gray-600">Please contact us for more information.</p>
            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                onSuccess();
              }}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Close
            </button>
          </div>
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
        <label className="block text-xs font-semibold mb-0.5 text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
          placeholder="Enter your email (optional)"
        />
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
            d.setDate(d.getDate() + 3);
            return d.toISOString().split("T")[0];
          })()}
          className="w-full rounded-md border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
        />
        {errors.startDate && <p className="text-xs text-red-500 mt-0.5">{errors.startDate}</p>}
      </div>
      {form.startDate && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 flex flex-col gap-0.5">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Plan Validity</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center flex-1">
              <span className="text-[10px] text-gray-500 font-medium uppercase">Start Date</span>
              <span className="text-sm font-bold text-gray-800">{new Date(form.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <span className="text-blue-400 font-bold text-lg">→</span>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[10px] text-gray-500 font-medium uppercase">End Date</span>
              <span className="text-sm font-bold text-blue-700">{new Date(calcEndDate(form.startDate, plan.price)).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 text-center mt-1">Your plan will be active for {planDurationMonths(plan.price)} {planDurationMonths(plan.price) === 1 ? 'month' : 'months'}</p>
        </div>
      )}
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
