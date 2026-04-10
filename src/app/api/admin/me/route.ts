import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { config } from "@/lib/dbconfig";

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
    const payload = jwt.verify(token, config.JWT_SECRET) as any;
    return NextResponse.json({ email: payload.email, name: config.ADMIN_NAME || 'Admin' });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
