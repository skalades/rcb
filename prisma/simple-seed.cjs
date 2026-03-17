import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  // Create Admin
  await prisma.user.upsert({
    where: { email: 'admin@rcb.com' },
    update: {},
    create: {
      email: 'admin@rcb.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'ADMIN',
    },
  });

  // Create Services
  await prisma.service.upsert({
    where: { id: 'snow-wash' },
    update: {},
    create: {
      id: 'snow-wash',
      name: 'Premium Snow Wash',
      description: 'Pencucian busa salju premium pH balanced.',
      price: 50000,
      duration: 30,
    },
  });

  console.log('Seed success!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
