import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

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
    jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT id, sport, venue, date, time, status FROM bookings ORDER BY date DESC');
    return NextResponse.json({ bookings: rows });
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
