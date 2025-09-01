export interface DomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: string;
  occurredAt: Date;
  data: any;
}

export class UserEnrolledEvent implements DomainEvent {
  eventId: string;
  eventType: string = 'UserEnrolled';
  aggregateId: string;
  occurredAt: Date;
  data: {
    userId: string;
    lessonId: number;
    enrolledAt: Date;
  };

  constructor(userId: string, lessonId: number) {
    this.eventId = this.generateEventId();
    this.aggregateId = userId;
    this.occurredAt = new Date();
    this.data = {
      userId,
      lessonId,
      enrolledAt: new Date(),
    };
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export class LessonCompletedEvent implements DomainEvent {
  eventId: string;
  eventType: string = 'LessonCompleted';
  aggregateId: string;
  occurredAt: Date;
  data: {
    userId: string;
    lessonId: number;
    subject: string;
    completedAt: Date;
  };

  constructor(userId: string, lessonId: number, subject: string) {
    this.eventId = this.generateEventId();
    this.aggregateId = userId;
    this.occurredAt = new Date();
    this.data = {
      userId,
      lessonId,
      subject,
      completedAt: new Date(),
    };
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export class AchievementAwardedEvent implements DomainEvent {
  eventId: string;
  eventType: string = 'AchievementAwarded';
  aggregateId: string;
  occurredAt: Date;
  data: {
    userId: string;
    achievementId: string;
    achievementName: string;
    points: number;
    awardedAt: Date;
  };

  constructor(userId: string, achievementId: string, achievementName: string, points: number) {
    this.eventId = this.generateEventId();
    this.aggregateId = userId;
    this.occurredAt = new Date();
    this.data = {
      userId,
      achievementId,
      achievementName,
      points,
      awardedAt: new Date(),
    };
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Event publisher interface
export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}

// Event handler interface
export interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}
