import { 
  AchievementRule, 
  BronzeAchievementRule, 
  SilverAchievementRule, 
  GoldAchievementRule,
  AchievementRuleFactory,
  LessonCompletionEvent,
  UserEnrollmentEvent
} from '../AchievementRule';
import { AchievementType, AchievementCategory } from '@prisma/client';

describe('Achievement Rules', () => {
  describe('BronzeAchievementRule', () => {
    let bronzeRule: BronzeAchievementRule;

    beforeEach(() => {
      bronzeRule = new BronzeAchievementRule();
    });

    it('should return correct achievement type', () => {
      expect(bronzeRule.getAchievementType()).toBe(AchievementType.BRONZE);
    });

    it('should return correct category', () => {
      expect(bronzeRule.getCategory()).toBe(AchievementCategory.LESSON_COMPLETION);
    });

    it('should return correct points', () => {
      expect(bronzeRule.getPoints()).toBe(10);
    });

    it('should return correct threshold', () => {
      expect(bronzeRule.getThreshold()).toBe(1);
    });

    it('should award bronze for lesson completion', async () => {
      const event: LessonCompletionEvent = {
        userId: 'user123',
        lessonId: 1,
        subject: 'MATH',
        completedAt: new Date()
      };

      const canAward = await bronzeRule.canAward(event);
      expect(canAward).toBe(true);
    });
  });

  describe('SilverAchievementRule', () => {
    let silverRule: SilverAchievementRule;

    beforeEach(() => {
      silverRule = new SilverAchievementRule(3);
    });

    it('should return correct achievement type', () => {
      expect(silverRule.getAchievementType()).toBe(AchievementType.SILVER);
    });

    it('should return correct category', () => {
      expect(silverRule.getCategory()).toBe(AchievementCategory.SUBJECT_MASTERY);
    });

    it('should return correct points', () => {
      expect(silverRule.getPoints()).toBe(50);
    });

    it('should return correct threshold', () => {
      expect(silverRule.getThreshold()).toBe(3);
    });

    it('should use default threshold when not specified', () => {
      const defaultSilverRule = new SilverAchievementRule();
      expect(defaultSilverRule.getThreshold()).toBe(3);
    });

    it('should use custom threshold when specified', () => {
      const customSilverRule = new SilverAchievementRule(5);
      expect(customSilverRule.getThreshold()).toBe(5);
    });

    it('should award silver for lesson completion', async () => {
      const event: LessonCompletionEvent = {
        userId: 'user123',
        lessonId: 1,
        subject: 'MATH',
        completedAt: new Date()
      };

      const canAward = await silverRule.canAward(event);
      expect(canAward).toBe(true);
    });
  });

  describe('GoldAchievementRule', () => {
    let goldRule: GoldAchievementRule;

    beforeEach(() => {
      goldRule = new GoldAchievementRule('perfect_score');
    });

    it('should return correct achievement type', () => {
      expect(goldRule.getAchievementType()).toBe(AchievementType.GOLD);
    });

    it('should return correct category', () => {
      expect(goldRule.getCategory()).toBe(AchievementCategory.SPECIAL);
    });

    it('should return correct points', () => {
      expect(goldRule.getPoints()).toBe(100);
    });

    it('should return correct threshold', () => {
      expect(goldRule.getThreshold()).toBe(1);
    });

    it('should not award gold by default (special conditions)', async () => {
      const event: LessonCompletionEvent = {
        userId: 'user123',
        lessonId: 1,
        subject: 'MATH',
        completedAt: new Date()
      };

      const canAward = await goldRule.canAward(event);
      expect(canAward).toBe(false);
    });

    it('should not award gold for enrollment events', async () => {
      const event: UserEnrollmentEvent = {
        userId: 'user123',
        lessonId: 1,
        enrolledAt: new Date()
      };

      const canAward = await goldRule.canAward(event);
      expect(canAward).toBe(false);
    });
  });

  describe('AchievementRuleFactory', () => {
    describe('createRule()', () => {
      it('should create bronze rule', () => {
        const rule = AchievementRuleFactory.createRule(
          AchievementType.BRONZE, 
          AchievementCategory.LESSON_COMPLETION
        );

        expect(rule).toBeInstanceOf(BronzeAchievementRule);
        expect(rule.getAchievementType()).toBe(AchievementType.BRONZE);
      });

      it('should create silver rule', () => {
        const rule = AchievementRuleFactory.createRule(
          AchievementType.SILVER, 
          AchievementCategory.SUBJECT_MASTERY
        );

        expect(rule).toBeInstanceOf(SilverAchievementRule);
        expect(rule.getAchievementType()).toBe(AchievementType.SILVER);
      });

      it('should create gold rule', () => {
        const rule = AchievementRuleFactory.createRule(
          AchievementType.GOLD, 
          AchievementCategory.SPECIAL
        );

        expect(rule).toBeInstanceOf(GoldAchievementRule);
        expect(rule.getAchievementType()).toBe(AchievementType.GOLD);
      });

      it('should throw error for unknown achievement type', () => {
        expect(() => {
          AchievementRuleFactory.createRule(
            'UNKNOWN_TYPE' as AchievementType, 
            AchievementCategory.LESSON_COMPLETION
          );
        }).toThrow('Unknown achievement type: UNKNOWN_TYPE');
      });
    });

    describe('getAllRules()', () => {
      it('should return all rule types', () => {
        const rules = AchievementRuleFactory.getAllRules();

        expect(rules).toHaveLength(3);
        expect(rules[0]).toBeInstanceOf(BronzeAchievementRule);
        expect(rules[1]).toBeInstanceOf(SilverAchievementRule);
        expect(rules[2]).toBeInstanceOf(GoldAchievementRule);
      });

      it('should return rules with correct types', () => {
        const rules = AchievementRuleFactory.getAllRules();

        expect(rules[0].getAchievementType()).toBe(AchievementType.BRONZE);
        expect(rules[1].getAchievementType()).toBe(AchievementType.SILVER);
        expect(rules[2].getAchievementType()).toBe(AchievementType.GOLD);
      });

      it('should return rules with correct categories', () => {
        const rules = AchievementRuleFactory.getAllRules();

        expect(rules[0].getCategory()).toBe(AchievementCategory.LESSON_COMPLETION);
        expect(rules[1].getCategory()).toBe(AchievementCategory.SUBJECT_MASTERY);
        expect(rules[2].getCategory()).toBe(AchievementCategory.SPECIAL);
      });
    });
  });

  describe('Rule Integration Tests', () => {
    it('should have consistent point values across rule types', () => {
      const rules = AchievementRuleFactory.getAllRules();

      expect(rules[0].getPoints()).toBe(10);  // Bronze
      expect(rules[1].getPoints()).toBe(50);  // Silver
      expect(rules[2].getPoints()).toBe(100); // Gold
    });

    it('should have increasing point values', () => {
      const rules = AchievementRuleFactory.getAllRules();
      const points = rules.map(rule => rule.getPoints());

      expect(points[0]).toBeLessThan(points[1]);
      expect(points[1]).toBeLessThan(points[2]);
    });

    it('should handle lesson completion events consistently', async () => {
      const rules = AchievementRuleFactory.getAllRules();
      const event: LessonCompletionEvent = {
        userId: 'user123',
        lessonId: 1,
        subject: 'MATH',
        completedAt: new Date()
      };

      // Bronze and Silver should award, Gold should not (special conditions)
      const bronzeCanAward = await rules[0].canAward(event);
      const silverCanAward = await rules[1].canAward(event);
      const goldCanAward = await rules[2].canAward(event);

      expect(bronzeCanAward).toBe(true);
      expect(silverCanAward).toBe(true);
      expect(goldCanAward).toBe(false);
    });
  });
});
