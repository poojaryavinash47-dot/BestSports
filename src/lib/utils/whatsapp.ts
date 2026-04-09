import axios from 'axios';

export interface WhatsAppMessagePayload {
  name: string;
  phone: string;
  bookingId: string;
  date: string;
  plan: string;
  amount: number;
}

export interface WhatsAppSendResult {
  success: boolean;
  error?: string;
  providerResponse?: any;
}

export async function sendWhatsAppMessage(payload: WhatsAppMessagePayload): Promise<WhatsAppSendResult> {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const apiKey = process.env.WHATSAPP_API_KEY;
  const senderId = process.env.WHATSAPP_SENDER_ID;

  if (!apiUrl || !apiKey || !senderId) {
    return { success: false, error: 'WhatsApp API credentials missing' };
  }

  // Example template message
  const message = `Hi ${payload.name}, your booking (ID: ${payload.bookingId}) for ${payload.plan} on ${payload.date} is confirmed. Amount paid: ₹${payload.amount}. Thank you!`;

  try {
    const response = await axios.post(apiUrl, {
      to: payload.phone,
      type: 'template',
      template: {
        name: 'booking_confirmation', // Use your approved template name
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: payload.name },
              { type: 'text', text: payload.bookingId },
              { type: 'text', text: payload.plan },
              { type: 'text', text: payload.date },
              { type: 'text', text: payload.amount.toString() },
            ],
          },
        ],
      },
      from: senderId,
    }, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    return { success: true, providerResponse: response.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to send WhatsApp message', providerResponse: error?.response?.data };
  }
}
