import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.lesson.createMany({
    data: [
      { title: 'Algebra I',     subject: 'MATH',    grade: 7 },
      { title: 'Geometry',      subject: 'MATH',    grade: 8 },
      { title: 'Biology',       subject: 'SCIENCE', grade: 7 },
      { title: 'Chemistry',     subject: 'SCIENCE', grade: 8 },
      { title: 'Literature',    subject: 'ENGLISH', grade: 7 },
      { title: 'World History', subject: 'HISTORY', grade: 8 }
    ],
    skipDuplicates: true
  })
}
main().finally(() => prisma.$disconnect())
