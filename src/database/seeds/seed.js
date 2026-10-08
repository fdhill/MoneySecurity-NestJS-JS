require('dotenv/config');
const bcrypt = require('bcryptjs');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../src/generated/prisma/client.ts');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const USERS = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    phoneNumber: '080000000000',
    password: 'admin123',
    role: 1,
  },
  {
    name: 'Demo',
    email: 'demo@gmail.com',
    phoneNumber: '080000000001',
    password: 'demo123',
    role: 2,
  },
];

async function main() {
  for (const user of USERS) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password: bcrypt.hashSync(user.password, 10) },
    });
    console.log(`user siap: ${user.email} / ${user.password}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
