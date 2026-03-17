import { SignJWT, jwtVerify } from 'jose';
// import { cookies } from 'next/headers'; // Temporarily disabled due to Next.js version issues
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret'; // In production, use process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(payload: any) {
  const session = await encrypt(payload);
  return session;
}

export async function logout() {
  // logout should be handled at the route level via response.cookies.set
}

export async function getSession(request?: NextRequest) {
  if (!request) return null;
  const session = request.cookies.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
