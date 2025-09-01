import { Achievement, AchievementProps } from '../Achievement';
import { AchievementType, AchievementCategory } from '@prisma/client';

describe('Achievement Domain Model', () => {
  describe('Achievement.create()', () => {
    it('should create a valid achievement with all required fields', () => {
      const achievementData = {
        name: 'First Lesson',
        description: 'Complete your first lesson',
        type: AchievementType.BRONZE,
        category: AchievementCategory.LESSON_COMPLETION,
        points: 10,
        threshold: 1,
        icon: 'star.png',
        isActive: true
      };

      const achievement = Achievement.create(achievementData);

      expect(achievement.name).toBe('First Lesson');
      expect(achievement.description).toBe('Complete your first lesson');
      expect(achievement.type).toBe(AchievementType.BRONZE);
      expect(achievement.category).toBe(AchievementCategory.LESSON_COMPLETION);
      expect(achievement.points).toBe(10);
      expect(achievement.threshold).toBe(1);
      expect(achievement.icon).toBe('star.png');
      expect(achievement.isActive).toBe(true);
      expect(achievement.id).toBe(''); // Default value before DB assignment
      expect(achievement.createdAt).toBeInstanceOf(Date);
      expect(achievement.updatedAt).toBeInstanceOf(Date);
    });

    it('should create achievement without optional fields', () => {
      const achievementData = {
        name: 'Simple Achievement',
        description: 'A simple achievement',
        type: AchievementType.SILVER,
        category: AchievementCategory.SUBJECT_MASTERY,
        points: 50,
        isActive: true
      };

      const achievement = Achievement.create(achievementData);

      expect(achievement.name).toBe('Simple Achievement');
      expect(achievement.threshold).toBeUndefined();
      expect(achievement.icon).toBeUndefined();
    });

    it('should throw error for empty name', () => {
      const achievementData = {
        name: '',
        description: 'Test description',
        type: AchievementType.BRONZE,
        category: AchievementCategory.LESSON_COMPLETION,
        points: 10,
        isActive: true
      };

      expect(() => Achievement.create(achievementData)).toThrow('Achievement name cannot be empty');
    });

    it('should throw error for whitespace-only name', () => {
      const achievementData = {
        name: '   ',
        description: 'Test description',
        type: AchievementType.BRONZE,
        category: AchievementCategory.LESSON_COMPLETION,
        points: 10,
        isActive: true
      };

      expect(() => Achievement.create(achievementData)).toThrow('Achievement name cannot be empty');
    });

    it('should throw error for empty description', () => {
      const achievementData = {
        name: 'Test Achievement',
        description: '',
        type: AchievementType.BRONZE,
        category: AchievementCategory.LESSON_COMPLETION,
        points: 10,
        isActive: true
      };

      expect(() => Achievement.create(achievementData)).toThrow('Achievement description cannot be empty');
    });

    it('should throw error for invalid achievement type', () => {
      const achievementData = {
        name: 'Test Achievement',
        description: 'Test description',
        type: 'INVALID_TYPE' as AchievementType,
        category: AchievementCategory.LESSON_COMPLETION,
        points: 10,
        isActive: true
      };

      expect(() => Achievement.create(achievementData)).toThrow('Invalid achievement type');
    });

    it('should throw error for invalid category', () => {
      const achievementData = {
        name: 'Test Achievement',
        description: 'Test description',
        type: AchievementType.BRONZE,
        category: 'INVALID_CATEGORY' as AchievementCategory,
        points: 10,
        isActive: true
      };

      expect(() => Achievement.create(achievementData)).toThrow('Invalid achievement category');
    });

    it('should throw error for negative points', () => {
      const achievementData = {
        name: 'Test Achievement',
        description: 'Test description',
        type: AchievementType.BRONZE,
        category: AchievementCategory.LESSON_COMPLETION,
        points: -5,
        isActive: true
      };

      expect(() => Achievement.create(achievementData)).toThrow('Achievement points cannot be negative');
    });

    it('should throw error for threshold below 1', () => {
      const achievementData = {
        name: 'Test Achievement',
        description: 'Test description',
        type: AchievementType.BRONZE,
        category: AchievementCategory.LESSON_COMPLETION,
        points: 10,
        threshold: 0,
        isActive: true
      };

      expect(() => Achievement.create(achievementData)).toThrow('Achievement threshold must be at least 1');
    });
  });

  describe('Achievement.fromPersistence()', () => {
    it('should create achievement from persistence data', () => {
      const persistenceData: AchievementProps = {
        id: 'uuid-123',
        name: 'Test Achievement',
        description: 'Test description',
        type: AchievementType.GOLD,
        category: AchievementCategory.SPECIAL,
        points: 100,
        threshold: 5,
        icon: 'gold.png',
        isActive: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02')
      };

      const achievement = Achievement.fromPersistence(persistenceData);

      expect(achievement.id).toBe('uuid-123');
      expect(achievement.name).toBe('Test Achievement');
      expect(achievement.type).toBe(AchievementType.GOLD);
      expect(achievement.createdAt).toEqual(new Date('2023-01-01'));
      expect(achievement.updatedAt).toEqual(new Date('2023-01-02'));
    });
  });

  describe('Business Methods', () => {
    let achievement: Achievement;

    beforeEach(() => {
      achievement = Achievement.create({
        name: 'Test Achievement',
        description: 'Test description',
        type: AchievementType.BRONZE,
        category: AchievementCategory.LESSON_COMPLETION,
        points: 10,
        threshold: 1,
        isActive: true
      });
    });

    describe('activate()', () => {
      it('should activate achievement and update timestamp', () => {
        const originalUpdatedAt = achievement.updatedAt;
        
        // Wait a bit to ensure timestamp difference
        setTimeout(() => {
          achievement.activate();
          expect(achievement.isActive).toBe(true);
          expect(achievement.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
        }, 1);
      });
    });

    describe('deactivate()', () => {
      it('should deactivate achievement and update timestamp', () => {
        const originalUpdatedAt = achievement.updatedAt;
        
        setTimeout(() => {
          achievement.deactivate();
          expect(achievement.isActive).toBe(false);
          expect(achievement.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
        }, 1);
      });
    });

    describe('updatePoints()', () => {
      it('should update points with valid input', () => {
        achievement.updatePoints(25);
        expect(achievement.points).toBe(25);
      });

      it('should allow zero points', () => {
        achievement.updatePoints(0);
        expect(achievement.points).toBe(0);
      });

      it('should throw error for negative points', () => {
        expect(() => achievement.updatePoints(-5)).toThrow('Achievement points cannot be negative');
      });
    });

    describe('updateThreshold()', () => {
      it('should update threshold with valid input', () => {
        achievement.updateThreshold(5);
        expect(achievement.threshold).toBe(5);
      });

      it('should allow threshold of 1', () => {
        achievement.updateThreshold(1);
        expect(achievement.threshold).toBe(1);
      });

      it('should throw error for threshold below 1', () => {
        expect(() => achievement.updateThreshold(0)).toThrow('Achievement threshold must be at least 1');
      });
    });

    describe('isEligibleForUser()', () => {
      it('should return false for inactive achievement', () => {
        achievement.deactivate();
        const userStats = { totalPoints: 100, totalAchievements: 5 };
        
        expect(achievement.isEligibleForUser(userStats)).toBe(false);
      });

      it('should return true for active achievement without threshold', () => {
        const achievementWithoutThreshold = Achievement.create({
          name: 'No Threshold Achievement',
          description: 'No threshold required',
          type: AchievementType.BRONZE,
          category: AchievementCategory.LESSON_COMPLETION,
          points: 10,
          isActive: true
        });

        const userStats = { totalPoints: 0, totalAchievements: 0 };
        expect(achievementWithoutThreshold.isEligibleForUser(userStats)).toBe(true);
      });

      it('should return true when user meets lesson completion threshold', () => {
        const userStats = { totalPoints: 50, totalAchievements: 1 };
        expect(achievement.isEligibleForUser(userStats)).toBe(true);
      });

      it('should return false when user does not meet lesson completion threshold', () => {
        const userStats = { totalPoints: 50, totalAchievements: 0 };
        expect(achievement.isEligibleForUser(userStats)).toBe(false);
      });

      it('should handle subject mastery category', () => {
        const subjectMasteryAchievement = Achievement.create({
          name: 'Subject Master',
          description: 'Master a subject',
          type: AchievementType.SILVER,
          category: AchievementCategory.SUBJECT_MASTERY,
          points: 50,
          threshold: 100,
          isActive: true
        });

        const userStatsHigh = { totalPoints: 150, totalAchievements: 5 };
        const userStatsLow = { totalPoints: 50, totalAchievements: 5 };

        expect(subjectMasteryAchievement.isEligibleForUser(userStatsHigh)).toBe(true);
        expect(subjectMasteryAchievement.isEligibleForUser(userStatsLow)).toBe(false);
      });

      it('should return true for other categories regardless of threshold', () => {
        const streakAchievement = Achievement.create({
          name: 'Streak Master',
          description: 'Maintain a streak',
          type: AchievementType.GOLD,
          category: AchievementCategory.STREAK,
          points: 100,
          threshold: 7,
          isActive: true
        });

        const userStats = { totalPoints: 0, totalAchievements: 0 };
        expect(streakAchievement.isEligibleForUser(userStats)).toBe(true);
      });
    });
  });

  describe('toPersistence()', () => {
    it('should convert achievement to persistence format', () => {
      const achievement = Achievement.create({
        name: 'Test Achievement',
        description: 'Test description',
        type: AchievementType.PLATINUM,
        category: AchievementCategory.SPECIAL,
        points: 200,
        threshold: 10,
        icon: 'platinum.png',
        isActive: false
      });

      const persistenceData = achievement.toPersistence();

      expect(persistenceData).toEqual({
        id: '',
        name: 'Test Achievement',
        description: 'Test description',
        type: AchievementType.PLATINUM,
        category: AchievementCategory.SPECIAL,
        points: 200,
        threshold: 10,
        icon: 'platinum.png',
        isActive: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });
    });
  });

  describe('Getters', () => {
    it('should return correct values for all getters', () => {
      const achievement = Achievement.create({
        name: 'Getter Test',
        description: 'Testing getters',
        type: AchievementType.GOLD,
        category: AchievementCategory.TIME_BASED,
        points: 75,
        threshold: 3,
        icon: 'time.png',
        isActive: true
      });

      expect(achievement.id).toBe('');
      expect(achievement.name).toBe('Getter Test');
      expect(achievement.description).toBe('Testing getters');
      expect(achievement.type).toBe(AchievementType.GOLD);
      expect(achievement.category).toBe(AchievementCategory.TIME_BASED);
      expect(achievement.points).toBe(75);
      expect(achievement.threshold).toBe(3);
      expect(achievement.icon).toBe('time.png');
      expect(achievement.isActive).toBe(true);
      expect(achievement.createdAt).toBeInstanceOf(Date);
      expect(achievement.updatedAt).toBeInstanceOf(Date);
    });
  });
});
