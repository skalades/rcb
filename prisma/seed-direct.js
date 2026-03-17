import mysql from 'mysql2/promise';
import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbUrl = process.env.DATABASE_URL;
console.log('Using DB URL:', dbUrl);

async function main() {
  const urlParams = new URL(dbUrl);
  
  const connection = await mysql.createConnection({
    host: urlParams.hostname,
    port: parseInt(urlParams.port || '3306'),
    user: urlParams.username,
    password: urlParams.password,
    database: urlParams.pathname.split('/')[1]
  });

  const hashedPassword = await bcrypt.hash('admin123', 10);

  // User model: id, email, password, name, role
  await connection.execute(`
    INSERT INTO User (id, email, password, name, role) 
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE password = VALUES(password)
  `, [
    'admin-id', 
    'admin@rcb.com', 
    hashedPassword, 
    'Super Admin', 
    'ADMIN'
  ]);

  console.log('Seed success: Admin user created via MySQL2.');
  await connection.end();
}

main().catch(console.error);
