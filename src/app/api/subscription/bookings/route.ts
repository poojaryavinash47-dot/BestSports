import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Insert subscription booking into the database
    const conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO subscription_bookings (full_name, phone, email, batch, start_date, notes, plan_name, plan_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.fullName,
        data.phone,
        data.email,
        data.batch,
        data.startDate,
        data.notes,
        data.planName,
        data.planPrice,
      ]
    );
    conn.release();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() });
  }
}
