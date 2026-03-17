import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';

export async function GET() {
  try {
    // 1. Total Revenue (Akumulasi totalPrice dari semua order)
    const totalRevenueResult = await prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
    });
    const totalRevenue = Number(totalRevenueResult._sum.totalPrice || 0);

    // 2. Total Orders & Members
    const totalOrders = await prisma.order.count();
    const memberCount = await prisma.member.count();

    // 3. Low Stock Items (quantity <= minQuantity)
    const lowStockItems = await prisma.inventoryItem.count({
      where: {
        quantity: {
          lte: prisma.inventoryItem.fields.minQuantity as any, // TypeScript workaround for Prisma field comparison
        },
      },
    });
    
    // Better way for low stock search if field comparison is tricky in Prisma
    const allItems = await prisma.inventoryItem.findMany();
    const lowStockCount = allItems.filter(item => Number(item.quantity) <= Number(item.minQuantity)).length;

    // 4. Bar Chart Data (Last 7 Days)
    const barChartData = await Promise.all(
      Array.from({ length: 7 }).map(async (_, i) => {
        const date = subDays(new Date(), 6 - i);
        const start = startOfDay(date);
        const end = endOfDay(date);
        
        const dayRevenue = await prisma.order.aggregate({
          where: {
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            totalPrice: true,
          },
        });
        
        return {
          day: format(date, 'EEE'),
          revenue: Number(dayRevenue._sum.totalPrice || 0),
        };
      })
    );

    // 5. Top Services
    const topServices = await prisma.service.findMany({
      include: {
        _count: {
          select: { orders: true },
        },
      },
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
      take: 3,
    });

    const formattedTopServices = topServices.map(s => ({
      name: s.name,
      count: s._count.orders,
    }));

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      memberCount,
      lowStockItems: lowStockCount,
      revenueTrend: barChartData,
      topServices: formattedTopServices,
    });
  } catch (error) {
    console.error('Reports API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch report data' }, { status: 500 });
  }
}
