import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

console.log('Using DATABASE_URL:', process.env.DATABASE_URL);

// Use a simpler initialization that we know Prisma might accept
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
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

  console.log('Seed success: Admin user created.');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
