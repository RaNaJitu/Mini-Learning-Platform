// Jest setup file for global test configuration

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  // Uncomment to suppress console.log in tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Set test timeout
jest.setTimeout(10000);

// Global test utilities
global.testUtils = {
  createMockDate: () => new Date('2023-01-01T00:00:00.000Z'),
  createMockUser: (overrides = {}) => ({
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
    role: 'STUDENT',
    createdAt: new Date('2023-01-01'),
    ...overrides
  }),
  createMockLesson: (overrides = {}) => ({
    id: 1,
    title: 'Test Lesson',
    subject: 'MATH',
    grade: 7,
    createdAt: new Date('2023-01-01'),
    ...overrides
  }),
  createMockAchievement: (overrides = {}) => ({
    id: 'uuid-123',
    name: 'Test Achievement',
    description: 'Test description',
    type: 'BRONZE',
    category: 'LESSON_COMPLETION',
    points: 10,
    threshold: 1,
    icon: 'star.png',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    ...overrides
  })
};
