import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/lib/utils/whatsapp';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, bookingId, date, plan, amount } = body;
    if (!name || !phone || !bookingId || !date || !plan || typeof amount !== 'number') {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    const result = await sendWhatsAppMessage({ name, phone, bookingId, date, plan, amount });
    if (!result.success) {
      console.error('WhatsApp send error:', result.error, result.providerResponse);
      return NextResponse.json({ success: false, error: result.error, providerResponse: result.providerResponse }, { status: 500 });
    }
    return NextResponse.json({ success: true, providerResponse: result.providerResponse });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
