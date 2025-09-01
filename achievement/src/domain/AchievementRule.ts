import { AchievementType, AchievementCategory } from "@prisma/client";

export interface LessonCompletionEvent {
  userId: string;
  lessonId: number;
  subject: string;
  completedAt: Date;
}

export interface UserEnrollmentEvent {
  userId: string;
  lessonId: number;
  enrolledAt: Date;
}

export interface AchievementAwardedEvent {
  userId: string;
  achievementId: string;
  points: number;
  awardedAt: Date;
}

// Abstract base class for achievement rules
export abstract class AchievementRule {
  abstract canAward(event: LessonCompletionEvent | UserEnrollmentEvent): Promise<boolean>;
  abstract getAchievementType(): AchievementType;
  abstract getCategory(): AchievementCategory;
  abstract getPoints(): number;
  abstract getThreshold(): number;
}

// Bronze achievement rule - awarded for first lesson completion
export class BronzeAchievementRule extends AchievementRule {
  async canAward(event: LessonCompletionEvent): Promise<boolean> {
    // This would check if user has completed any lesson before
    // For now, we'll award bronze for any lesson completion
    return true;
  }

  getAchievementType(): AchievementType {
    return AchievementType.BRONZE;
  }

  getCategory(): AchievementCategory {
    return AchievementCategory.LESSON_COMPLETION;
  }

  getPoints(): number {
    return 10;
  }

  getThreshold(): number {
    return 1; // First lesson completion
  }
}

// Silver achievement rule - awarded for N completions in a subject
export class SilverAchievementRule extends AchievementRule {
  private subjectThreshold: number;

  constructor(subjectThreshold: number = 3) {
    super();
    this.subjectThreshold = subjectThreshold;
  }

  async canAward(event: LessonCompletionEvent): Promise<boolean> {
    // This would check if user has completed N lessons in the same subject
    // For now, we'll use a simple threshold
    return true; // In real implementation, check user's completion count for this subject
  }

  getAchievementType(): AchievementType {
    return AchievementType.SILVER;
  }

  getCategory(): AchievementCategory {
    return AchievementCategory.SUBJECT_MASTERY;
  }

  getPoints(): number {
    return 50;
  }

  getThreshold(): number {
    return this.subjectThreshold;
  }
}

// Gold achievement rule - for special events (extensible)
export class GoldAchievementRule extends AchievementRule {
  private specialCondition: string;

  constructor(specialCondition: string) {
    super();
    this.specialCondition = specialCondition;
  }

  async canAward(event: LessonCompletionEvent | UserEnrollmentEvent): Promise<boolean> {
    // This would check special conditions
    // Examples: completing all lessons, perfect scores, etc.
    return false; // Implement specific logic based on specialCondition
  }

  getAchievementType(): AchievementType {
    return AchievementType.GOLD;
  }

  getCategory(): AchievementCategory {
    return AchievementCategory.SPECIAL;
  }

  getPoints(): number {
    return 100;
  }

  getThreshold(): number {
    return 1;
  }
}

// Achievement rule factory
export class AchievementRuleFactory {
  static createRule(type: AchievementType, category: AchievementCategory): AchievementRule {
    switch (type) {
      case AchievementType.BRONZE:
        return new BronzeAchievementRule();
      case AchievementType.SILVER:
        return new SilverAchievementRule();
      case AchievementType.GOLD:
        return new GoldAchievementRule('special_condition');
      default:
        throw new Error(`Unknown achievement type: ${type}`);
    }
  }

  static getAllRules(): AchievementRule[] {
    return [
      new BronzeAchievementRule(),
      new SilverAchievementRule(),
      new GoldAchievementRule('perfect_score'),
    ];
  }
}
