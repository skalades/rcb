import * as bcrypt from 'bcryptjs'
import { prisma } from '../src/lib/prisma.js'

async function main() {
  // 0. Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@rcb.com' },
    update: {},
    create: {
      email: 'admin@rcb.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'ADMIN',
    },
  })

  // 1. Create Services
  const snowWash = await prisma.service.upsert({
    where: { id: 'snow-wash' },
    update: {},
    create: {
      id: 'snow-wash',
      name: 'Premium Snow Wash',
      description: 'Pencucian busa salju premium pH balanced.',
      price: 50000,
      duration: 30,
    },
  })

  const detailing = await prisma.service.upsert({
    where: { id: 'interior-detail' },
    update: {},
    create: {
      id: 'interior-detail',
      name: 'Interior Detail',
      description: 'Pembersihan mendalam kabin dan jok.',
      price: 150000,
      duration: 60,
    },
  })

  // 2. Create Employees
  await prisma.employee.upsert({
    where: { id: 'emp-1' },
    update: {},
    create: {
      id: 'emp-1',
      name: 'Budi Santoso',
      role: 'WASHER',
      commissionRate: 10,
    },
  })

  // 3. Create Inventory Items
  await prisma.inventoryItem.upsert({
    where: { id: 'inv-soap' },
    update: {},
    create: {
      id: 'inv-soap',
      name: 'Premium Shampoo',
      unit: 'Liter',
      quantity: 5,
      minQuantity: 10,
    },
  })

  await prisma.inventoryItem.upsert({
    where: { id: 'inv-tire' },
    update: {},
    create: {
      id: 'inv-tire',
      name: 'Tire Polish',
      unit: 'Liter',
      quantity: 15,
      minQuantity: 5,
    },
  })

  // 4. Create a sample Member
  await prisma.member.upsert({
    where: { phone: '08123456789' },
    update: {},
    create: {
      name: 'Anto Wijaya',
      phone: '08123456789',
      plateNumber: 'B 1234 ABC',
      tier: 'GOLD',
      points: 250,
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
