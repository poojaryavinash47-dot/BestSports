import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import { config } from "@/lib/dbconfig";

function parseToken(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('admin_token='));
  if (!match) return null;
  return match.split('=')[1];
}

export async function GET(req: Request) {
  const token = parseToken(req);
  if (!token) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  try {
    jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const conn = await pool.getConnection();
  try {
    // Helper: derive plan duration in months from price string (e.g. "₹2500/month" → 1, "₹15000/6 months" → 6, "₹20000/year" → 12)
    function planDurationMonths(planPrice: string): number {
      const p = (planPrice || '').toLowerCase();
      const sixMonths = /6\s*months?/.test(p);
      const threeMonths = /3\s*months?/.test(p);
      const twoMonths = /2\s*months?/.test(p);
      const year = /year|yearly|annual|12\s*months?/.test(p);
      if (sixMonths) return 6;
      if (threeMonths) return 3;
      if (twoMonths) return 2;
      if (year) return 12;
      return 1; // default: 1 month
    }

    function addMonths(dateStr: string, months: number): string {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      d.setMonth(d.getMonth() + months);
      d.setDate(d.getDate() - 1); // Exclude the last date, match frontend
      return d.toISOString().slice(0, 10);
    }

    // Fetch all booking types
    const [bookings]: any = await conn.query('SELECT id, sport, venue, date, time, status FROM bookings');
    const [subscriptionBookings]: any = await conn.query('SELECT id, full_name as fullName, phone, email, batch, start_date as startDate, notes, plan_name as planName, plan_price as planPrice FROM subscription_bookings');
    const [membershipBookings]: any = await conn.query('SELECT id, full_name as fullName, phone, email, start_date as startDate, notes, plan_name as planName, plan_price as planPrice FROM membership_bookings');

    // Normalize and combine all bookings
    const allBookings = [
      ...bookings.map((b: any) => ({
        ...b,
        type: 'regular',
      })),
      ...subscriptionBookings.map((b: any) => ({
        ...b,
        endDate: addMonths(b.startDate, planDurationMonths(b.planPrice)),
        type: 'subscription',
      })),
      ...membershipBookings.map((b: any) => ({
        ...b,
        endDate: addMonths(b.startDate, planDurationMonths(b.planPrice)),
        type: 'membership',
      })),
    ];

    // Sort by start/date descending (most recent first)
    allBookings.sort((a: any, b: any) => {
      const da = new Date(b.startDate || b.date || 0).getTime();
      const db2 = new Date(a.startDate || a.date || 0).getTime();
      return da - db2;
    });

    return NextResponse.json({ bookings: allBookings });
  } catch (err) {
    return NextResponse.json({ message: 'Query failed' }, { status: 500 });
  } finally {
    conn.release();
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Generate a unique booking ID
    const id = `BK${Math.floor(Math.random() * 900000 + 100000)}`;
    const { sport, venue, date, time, status = 'pending', fullName, phone, email, batch, notes } = data;

    // Insert into bookings table (add extra columns if needed)
    const conn = await pool.getConnection();
    try {
      await conn.query(
        'INSERT INTO bookings (id, sport, venue, date, time, status) VALUES (?, ?, ?, ?, ?, ?)',
        [id, sport, venue, date, time, status]
      );
      return NextResponse.json({ success: true, id });
    } finally {
      conn.release();
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: err?.toString() });
  }
}

export async function PATCH(req: Request) {
  const token = parseToken(req);
  if (!token) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  try { jwt.verify(token, config.JWT_SECRET); } catch {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    const allowed = ['pending', 'confirmed', 'cancelled'];
    if (!allowed.includes(status)) return NextResponse.json({ message: 'Invalid status' }, { status: 400 });

    const conn = await pool.getConnection();
    try {
      await conn.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
      return NextResponse.json({ ok: true });
    } finally {
      conn.release();
    }
  } catch {
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const token = parseToken(req);
  if (!token) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  try { jwt.verify(token, config.JWT_SECRET); } catch {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const type = url.searchParams.get('type');
  if (!id || !type) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });

  const conn = await pool.getConnection();
  try {
    if (type === 'regular') {
      await conn.query('DELETE FROM bookings WHERE id = ?', [id]);
    } else if (type === 'subscription') {
      await conn.query('DELETE FROM subscription_bookings WHERE id = ?', [id]);
    } else if (type === 'membership') {
      await conn.query('DELETE FROM membership_bookings WHERE id = ?', [id]);
    } else {
      return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  } finally {
    conn.release();
  }
}
