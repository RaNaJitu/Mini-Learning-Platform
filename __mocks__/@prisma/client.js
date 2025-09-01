// Mock Prisma client for unit tests (CommonJS exports for Jest)
const Role = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT'
};

const Subject = {
  MATH: 'MATH',
  SCIENCE: 'SCIENCE',
  ENGLISH: 'ENGLISH',
  HISTORY: 'HISTORY'
};

const AchievementType = {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM'
};

const AchievementCategory = {
  LESSON_COMPLETION: 'LESSON_COMPLETION',
  STREAK: 'STREAK',
  SUBJECT_MASTERY: 'SUBJECT_MASTERY',
  TIME_BASED: 'TIME_BASED',
  SPECIAL: 'SPECIAL'
};

const PrismaClient = jest.fn().mockImplementation(() => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn()
  },
  lesson: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn()
  },
  achievement: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn()
  },
  userAchievement: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn()
  },
  userStats: {
    findUnique: jest.fn(),
    create: jest.fn(),
    upsert: jest.fn()
  },
  enrollment: {
    upsert: jest.fn(),
    findMany: jest.fn()
  },
  completion: {
    create: jest.fn(),
    findMany: jest.fn()
  }
}));

module.exports = {
  Role,
  Subject,
  AchievementType,
  AchievementCategory,
  PrismaClient,
  default: PrismaClient
};
