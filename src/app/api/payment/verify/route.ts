import { NextRequest, NextResponse } from 'next/server';

// This is a mock payment verification route. Replace with your real logic or webhook handler.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Assume payment is verified here (add your logic)
    const { name, phone, bookingId, date, plan, amount } = body;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
