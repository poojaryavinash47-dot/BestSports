"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    batchTimings: string[];
    theme: { button: string };
  } | null;
}

const getMinStartDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3); // Block 3 days from today
  return date.toISOString().split("T")[0];
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, plan }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    batch: "",
    startDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (plan) {
      setForm((f) => ({ ...f, batch: plan.batchTimings[0] || "" }));
    }
  }, [plan]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName) newErrors.fullName = "Full Name is required";
    if (!form.phone) newErrors.phone = "Phone Number is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.batch) newErrors.batch = "Select a batch timing";
    if (!form.startDate) newErrors.startDate = "Select a start date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !plan) return;

    // Razorpay integration
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      // Parse price (remove currency symbol and non-digits)
      const amountMatch = plan.price.replace(/[^\d]/g, "");
      const amount = parseInt(amountMatch || "1000", 10) * 100; // in paise
      const options = {
        key: 'rzp_test_SFWS45gPercdHp', // Provided test key
        amount,
        currency: 'INR',
        name: plan.name,
        description: 'Subscription Payment',
        handler: async function (response: any) {
          // Store subscription booking in DB after payment
          try {
            await fetch("/api/subscription/bookings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fullName: form.fullName,
                phone: form.phone,
                email: form.email,
                batch: form.batch,
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
            onClose();
          }, 2000);
          setForm({
            fullName: "",
            phone: "",
            email: "",
            batch: plan?.batchTimings[0] || "",
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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || !plan) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={handleOverlayClick}
      >
        <motion.div
          className="relative w-full max-w-md mx-4 rounded-xl bg-white shadow-xl p-4 md:p-6 flex flex-col gap-3 min-h-[420px] max-h-[90vh] overflow-y-auto border border-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {success && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-semibold border border-green-300">
              Booking confirmed! Thank you.
            </div>
          )}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <IoClose size={24} />
          </button>
          <div className="mb-1">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-0.5 tracking-tight">Book: {plan.name}</h2>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-700 text-base md:text-lg">{plan.price}</span>
            </div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              <label className="block text-xs font-semibold mb-0.5 text-gray-700">Select Batch Timing<span className="text-red-500">*</span></label>
              <select
                name="batch"
                value={form.batch}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
              >
                {plan.batchTimings.map((timing) => (
                  <option key={timing} value={timing}>{timing}</option>
                ))}
              </select>
              {errors.batch && <p className="text-xs text-red-500 mt-0.5">{errors.batch}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-0.5 text-gray-700">Select Start Date<span className="text-red-500">*</span></label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                min={getMinStartDate()}
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
            <button
              type="button"
              className="w-full py-2 rounded-md text-gray-700 font-semibold border border-gray-200 mt-1 hover:bg-gray-50 transition text-base"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
