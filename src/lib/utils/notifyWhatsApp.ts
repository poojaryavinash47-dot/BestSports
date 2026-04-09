// Example: Call after payment success (frontend)
export async function notifyWhatsAppAfterPayment({ name, phone, bookingId, date, plan, amount }: {
  name: string;
  phone: string;
  bookingId: string;
  date: string;
  plan: string;
  amount: number;
}) {
  try {
    const res = await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, bookingId, date, plan, amount }),
    });
    const data = await res.json();
    if (!data.success) {
      // Optionally show error to admin or log
      console.error('WhatsApp send failed:', data.error);
    }
    return data;
  } catch (error) {
    console.error('WhatsApp notify error:', error);
    return { success: false, error };
  }
}
