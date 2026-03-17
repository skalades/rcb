import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Handle ESM/CJS interop for bcryptjs if necessary
    const bc: any = (bcryptjs as any).compare ? bcryptjs : (bcryptjs as any).default;
    const isMatch = await bc.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const session = await login({ 
      id: user.id, 
      email: user.email, 
      role: user.role, 
      name: user.name 
    });

    const response = NextResponse.json({ 
      success: true, 
      user: { name: user.name, role: user.role } 
    });
    
    response.cookies.set('session', session, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
    });

    return response;
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON request' }, { status: 400 });
    }
    console.error('Login error:', error);
    return NextResponse.json({ 
      error: 'Authentication failed', 
      details: error.message 
    }, { status: 500 });
  }
}
