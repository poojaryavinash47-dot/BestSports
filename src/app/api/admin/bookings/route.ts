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
    // Fetch all booking types
    const [bookings]: any = await conn.query('SELECT id, sport, venue, date, time, status FROM bookings');
    const [subscriptionBookings]: any = await conn.query('SELECT id, full_name as fullName, phone, email, batch, start_date as date, notes, plan_name as planName, plan_price as planPrice FROM subscription_bookings');
    const [membershipBookings]: any = await conn.query('SELECT id, full_name as fullName, phone, email, start_date as date, notes, plan_name as planName, plan_price as planPrice FROM membership_bookings');

    // Normalize and combine all bookings
    const allBookings = [
      ...bookings.map((b: any) => ({
        ...b,
        type: 'regular',
      })),
      ...subscriptionBookings.map((b: any) => ({
        ...b,
        type: 'subscription',
      })),
      ...membershipBookings.map((b: any) => ({
        ...b,
        type: 'membership',
      })),
    ];

    // Sort by date descending (most recent first)
    allBookings.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      // Optionally, store user info in a separate table or extend bookings table schema
      return NextResponse.json({ success: true, id });
    } finally {
      conn.release();
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: err?.toString() });
  }
}
