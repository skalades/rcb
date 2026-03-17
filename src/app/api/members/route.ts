import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get('phone');
  
  try {
    if (phone) {
      const member = await prisma.member.findUnique({ where: { phone } });
      return NextResponse.json(member);
    }
    const members = await prisma.member.findMany();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const member = await prisma.member.create({
      data: {
        name: body.name,
        phone: body.phone,
        plateNumber: body.plateNumber,
        tier: body.tier || 'SILVER',
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
