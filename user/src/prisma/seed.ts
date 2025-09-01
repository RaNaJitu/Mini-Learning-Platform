import { PrismaClient, Role } from '@prisma/client'
import argon2 from 'argon2'
const prisma = new PrismaClient()
async function main() {
  const adminHash = await argon2.hash('Admin@123')
  const studentHash = await argon2.hash('Pass@123')
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', password: adminHash, role: Role.ADMIN }
  })
  await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: { email: 'student@example.com', password: studentHash, role: Role.STUDENT }
  })
}
main().finally(() => prisma.$disconnect())
