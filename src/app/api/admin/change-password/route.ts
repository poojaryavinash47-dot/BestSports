import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import crypto from "crypto";

function parseToken(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('admin_token='));
  if (!match) return null;
  return match.split('=')[1];
}

export async function POST(req: Request) {
  try {
    const token = parseToken(req);
    if (!token) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

    let payload: any;
    try { payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret'); } catch (e) { return NextResponse.json({ message: 'Invalid token' }, { status: 401 }); }

    const body = await req.json();
    const { current, password } = body || {};
    if (!current || !password) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });

    const email = payload.email;
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT id, password_hash, password_salt FROM admins WHERE email = ?', [email]);
      const users = rows as any[];
      if (users.length === 0) return NextResponse.json({ message: 'User not found' }, { status: 404 });
      const user = users[0];

      const curSalt = user.password_salt || '';
      const curHash = crypto.pbkdf2Sync(current, curSalt, 100000, 64, 'sha512').toString('hex');
      if (curHash !== user.password_hash) return NextResponse.json({ message: 'Current password incorrect' }, { status: 401 });

      const newSalt = crypto.randomBytes(16).toString('hex');
      const newHash = crypto.pbkdf2Sync(password, newSalt, 100000, 64, 'sha512').toString('hex');
      await conn.query('UPDATE admins SET password_hash = ?, password_salt = ? WHERE id = ?', [newHash, newSalt, user.id]);
      return NextResponse.json({ ok: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
