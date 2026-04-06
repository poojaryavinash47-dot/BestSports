import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function parseTokenFromHeader(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('admin_token='));
  if (!match) return null;
  return match.split('=')[1];
}

export async function GET(req: Request) {
  const token = parseTokenFromHeader(req);
  if (!token) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret') as any;
    return NextResponse.json({ email: payload.email, name: process.env.ADMIN_NAME || 'Admin' });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
