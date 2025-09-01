import { PrismaClient, AchievementType, AchievementCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some example achievements
  await prisma.achievement.createMany({
    data: [
      { 
        name: "First Lesson",
        description: "Complete your first lesson",
        type: AchievementType.BRONZE,
        category: AchievementCategory.LESSON_COMPLETION,
        points: 10,
        threshold: 1
      },
      { 
        name: "Math Master",
        description: "Complete 5 math lessons",
        type: AchievementType.SILVER,
        category: AchievementCategory.SUBJECT_MASTERY,
        points: 50,
        threshold: 5
      },
      { 
        name: "Streak Master",
        description: "Maintain a 7-day learning streak",
        type: AchievementType.GOLD,
        category: AchievementCategory.STREAK,
        points: 100,
        threshold: 7
      },
    ],
    skipDuplicates: true,
  });

  console.log('✓ achievement seed complete');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
