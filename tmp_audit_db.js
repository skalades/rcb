import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function audit() {
  console.log('--- Starting API/DB Audit ---');
  
  try {
    const userCount = await prisma.user.count();
    console.log(`Users: ${userCount}`);
    
    const employeeCount = await prisma.employee.count();
    console.log(`Employees: ${employeeCount}`);
    
    const inventoryCount = await prisma.inventoryItem.count();
    console.log(`Inventory Items: ${inventoryCount}`);
    
    const memberCount = await prisma.member.count();
    console.log(`Members: ${memberCount}`);
    
    const orderCount = await prisma.order.count();
    console.log(`Orders: ${orderCount}`);
    
    const serviceCount = await prisma.service.count();
    console.log(`Services: ${serviceCount}`);
    
    console.log('--- DB Connectivity: OK ---');
  } catch (error) {
    console.error('--- DB Audit Failed ---');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

audit();
