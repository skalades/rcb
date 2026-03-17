import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        service: true,
        member: true,
        employee: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plateNumber, serviceId, assignedEmployeeId, memberPhone } = body;

    // Fetch service for price
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    // Fetch member if phone provided
    let memberId = null;
    if (memberPhone) {
      const member = await prisma.member.findUnique({ where: { phone: memberPhone } });
      if (member) memberId = member.id;
    }

    const orderId = crypto.randomUUID();
    
    // Create transaction to ensure order and commission are created together
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          id: orderId,
          plateNumber,
          vehicleType: 'CAR', // Defaulting for now
          totalPrice: service.price,
          serviceId: serviceId,
          memberId: memberId,
          employeeId: assignedEmployeeId || null,
          status: 'WAITING',
          updatedAt: new Date(),
        }
      });

      if (assignedEmployeeId) {
        const employee = await tx.employee.findUnique({ where: { id: assignedEmployeeId } });
        if (employee) {
          const commissionAmount = Number(service.price) * (Number(employee.commissionRate) / 100);
          await tx.commission.create({
            data: {
              id: crypto.randomUUID(),
              orderId: orderId,
              employeeId: assignedEmployeeId,
              amount: commissionAmount,
            }
          });
        }
      }
      return order;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
