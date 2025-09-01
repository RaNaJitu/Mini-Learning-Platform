import { AchievementType, AchievementCategory } from "@prisma/client";

export interface AchievementProps {
  id: string;
  name: string;
  description: string;
  type: AchievementType;
  category: AchievementCategory;
  points: number;
  threshold?: number;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Achievement {
  private constructor(private props: AchievementProps) {}

  static create(props: Omit<AchievementProps, 'id' | 'createdAt' | 'updatedAt'>): Achievement {
    // Domain validations
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Achievement name cannot be empty');
    }
    
    if (!props.description || props.description.trim().length === 0) {
      throw new Error('Achievement description cannot be empty');
    }

    if (!Object.values(AchievementType).includes(props.type)) {
      throw new Error('Invalid achievement type');
    }

    if (!Object.values(AchievementCategory).includes(props.category)) {
      throw new Error('Invalid achievement category');
    }

    if (props.points < 0) {
      throw new Error('Achievement points cannot be negative');
    }

    if (props.threshold !== undefined && props.threshold < 1) {
      throw new Error('Achievement threshold must be at least 1');
    }

    return new Achievement({
      ...props,
      id: '', // Will be set by database
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: AchievementProps): Achievement {
    return new Achievement(props);
  }

  // Getters
  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get description(): string { return this.props.description; }
  get type(): AchievementType { return this.props.type; }
  get category(): AchievementCategory { return this.props.category; }
  get points(): number { return this.props.points; }
  get threshold(): number | undefined { return this.props.threshold; }
  get icon(): string | undefined { return this.props.icon; }
  get isActive(): boolean { return this.props.isActive; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  // Business methods
  activate(): void {
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  updatePoints(newPoints: number): void {
    if (newPoints < 0) {
      throw new Error('Achievement points cannot be negative');
    }
    this.props.points = newPoints;
    this.props.updatedAt = new Date();
  }

  updateThreshold(newThreshold: number): void {
    if (newThreshold < 1) {
      throw new Error('Achievement threshold must be at least 1');
    }
    this.props.threshold = newThreshold;
    this.props.updatedAt = new Date();
  }

  isEligibleForUser(userStats: { totalPoints: number; totalAchievements: number }): boolean {
    if (!this.props.isActive) return false;
    
    // Check if user meets threshold requirements
    if (this.props.threshold) {
      switch (this.props.category) {
        case AchievementCategory.LESSON_COMPLETION:
          return userStats.totalAchievements >= this.props.threshold;
        case AchievementCategory.SUBJECT_MASTERY:
          return userStats.totalPoints >= this.props.threshold;
        default:
          return true;
      }
    }
    
    return true;
  }

  // Convert to persistence format
  toPersistence(): AchievementProps {
    return { ...this.props };
  }
}
