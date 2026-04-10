import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import pool from "@/lib/db";
import { config } from "@/lib/dbconfig";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT id, email, password_hash, password_salt, name FROM admins WHERE email = ?', [email]);
      const users = rows as any[];
      if (users.length === 0) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }

      const user = users[0];
      const salt = user.password_salt || '';
      const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
      if (hash !== user.password_hash) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }

      const token = jwt.sign({ email: user.email, id: user.id }, config.JWT_SECRET, { expiresIn: '8h' });

      const res = NextResponse.json({ ok: true });
      res.cookies.set('admin_token', token, { httpOnly: true, path: '/', maxAge: 8 * 60 * 60, secure: process.env.NODE_ENV === 'production' });
      return res;
    } finally {
      conn.release();
    }
  } catch (err) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
