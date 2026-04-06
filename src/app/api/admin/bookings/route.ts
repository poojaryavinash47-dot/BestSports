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
