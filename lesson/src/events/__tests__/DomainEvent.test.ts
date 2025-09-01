import { 
  UserEnrolledEvent, 
  LessonCompletedEvent, 
  AchievementAwardedEvent,
  DomainEvent 
} from '../DomainEvent';

describe('Domain Events', () => {
  describe('UserEnrolledEvent', () => {
    it('should create a valid user enrolled event', () => {
      const event = new UserEnrolledEvent('user123', 1);

      expect(event.eventType).toBe('UserEnrolled');
      expect(event.aggregateId).toBe('user123');
      expect(event.occurredAt).toBeInstanceOf(Date);
      expect(event.data.userId).toBe('user123');
      expect(event.data.lessonId).toBe(1);
      expect(event.data.enrolledAt).toBeInstanceOf(Date);
      expect(event.eventId).toMatch(/^event_\d+_[a-z0-9]+$/);
    });

    it('should generate unique event IDs', () => {
      const event1 = new UserEnrolledEvent('user1', 1);
      const event2 = new UserEnrolledEvent('user2', 2);

      expect(event1.eventId).not.toBe(event2.eventId);
    });

    it('should set occurredAt to current time', () => {
      const beforeCreation = new Date();
      const event = new UserEnrolledEvent('user123', 1);
      const afterCreation = new Date();

      expect(event.occurredAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(event.occurredAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });

    it('should set enrolledAt to current time', () => {
      const beforeCreation = new Date();
      const event = new UserEnrolledEvent('user123', 1);
      const afterCreation = new Date();

      expect(event.data.enrolledAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(event.data.enrolledAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });
  });

  describe('LessonCompletedEvent', () => {
    it('should create a valid lesson completed event', () => {
      const event = new LessonCompletedEvent('user123', 1, 'MATH');

      expect(event.eventType).toBe('LessonCompleted');
      expect(event.aggregateId).toBe('user123');
      expect(event.occurredAt).toBeInstanceOf(Date);
      expect(event.data.userId).toBe('user123');
      expect(event.data.lessonId).toBe(1);
      expect(event.data.subject).toBe('MATH');
      expect(event.data.completedAt).toBeInstanceOf(Date);
      expect(event.eventId).toMatch(/^event_\d+_[a-z0-9]+$/);
    });

    it('should handle different subjects', () => {
      const subjects = ['MATH', 'SCIENCE', 'ENGLISH', 'HISTORY'];
      
      subjects.forEach(subject => {
        const event = new LessonCompletedEvent('user123', 1, subject);
        expect(event.data.subject).toBe(subject);
      });
    });

    it('should generate unique event IDs', () => {
      const event1 = new LessonCompletedEvent('user1', 1, 'MATH');
      const event2 = new LessonCompletedEvent('user2', 2, 'SCIENCE');

      expect(event1.eventId).not.toBe(event2.eventId);
    });

    it('should set occurredAt to current time', () => {
      const beforeCreation = new Date();
      const event = new LessonCompletedEvent('user123', 1, 'MATH');
      const afterCreation = new Date();

      expect(event.occurredAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(event.occurredAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });

    it('should set completedAt to current time', () => {
      const beforeCreation = new Date();
      const event = new LessonCompletedEvent('user123', 1, 'MATH');
      const afterCreation = new Date();

      expect(event.data.completedAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(event.data.completedAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });
  });

  describe('AchievementAwardedEvent', () => {
    it('should create a valid achievement awarded event', () => {
      const event = new AchievementAwardedEvent('user123', 'achievement456', 'First Lesson', 10);

      expect(event.eventType).toBe('AchievementAwarded');
      expect(event.aggregateId).toBe('user123');
      expect(event.occurredAt).toBeInstanceOf(Date);
      expect(event.data.userId).toBe('user123');
      expect(event.data.achievementId).toBe('achievement456');
      expect(event.data.achievementName).toBe('First Lesson');
      expect(event.data.points).toBe(10);
      expect(event.data.awardedAt).toBeInstanceOf(Date);
      expect(event.eventId).toMatch(/^event_\d+_[a-z0-9]+$/);
    });

    it('should handle different point values', () => {
      const points = [10, 50, 100, 0];
      
      points.forEach(pointValue => {
        const event = new AchievementAwardedEvent('user123', 'achievement456', 'Test Achievement', pointValue);
        expect(event.data.points).toBe(pointValue);
      });
    });

    it('should generate unique event IDs', () => {
      const event1 = new AchievementAwardedEvent('user1', 'achievement1', 'Achievement 1', 10);
      const event2 = new AchievementAwardedEvent('user2', 'achievement2', 'Achievement 2', 20);

      expect(event1.eventId).not.toBe(event2.eventId);
    });

    it('should set occurredAt to current time', () => {
      const beforeCreation = new Date();
      const event = new AchievementAwardedEvent('user123', 'achievement456', 'Test Achievement', 10);
      const afterCreation = new Date();

      expect(event.occurredAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(event.occurredAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });

    it('should set awardedAt to current time', () => {
      const beforeCreation = new Date();
      const event = new AchievementAwardedEvent('user123', 'achievement456', 'Test Achievement', 10);
      const afterCreation = new Date();

      expect(event.data.awardedAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(event.data.awardedAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });
  });

  describe('DomainEvent Interface Compliance', () => {
    it('should implement DomainEvent interface for UserEnrolledEvent', () => {
      const event = new UserEnrolledEvent('user123', 1);
      
      expect(event).toHaveProperty('eventId');
      expect(event).toHaveProperty('eventType');
      expect(event).toHaveProperty('aggregateId');
      expect(event).toHaveProperty('occurredAt');
      expect(event).toHaveProperty('data');
    });

    it('should implement DomainEvent interface for LessonCompletedEvent', () => {
      const event = new LessonCompletedEvent('user123', 1, 'MATH');
      
      expect(event).toHaveProperty('eventId');
      expect(event).toHaveProperty('eventType');
      expect(event).toHaveProperty('aggregateId');
      expect(event).toHaveProperty('occurredAt');
      expect(event).toHaveProperty('data');
    });

    it('should implement DomainEvent interface for AchievementAwardedEvent', () => {
      const event = new AchievementAwardedEvent('user123', 'achievement456', 'Test Achievement', 10);
      
      expect(event).toHaveProperty('eventId');
      expect(event).toHaveProperty('eventType');
      expect(event).toHaveProperty('aggregateId');
      expect(event).toHaveProperty('occurredAt');
      expect(event).toHaveProperty('data');
    });
  });

  describe('Event ID Generation', () => {
    it('should generate event IDs with correct format', () => {
      const event = new UserEnrolledEvent('user123', 1);
      
      // Should match pattern: event_[timestamp]_[random_string]
      expect(event.eventId).toMatch(/^event_\d+_[a-z0-9]{9}$/);
    });

    it('should generate different IDs for events created at different times', async () => {
      const event1 = new UserEnrolledEvent('user123', 1);
      
      // Wait a small amount to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 1));
      
      const event2 = new UserEnrolledEvent('user123', 2);
      
      expect(event1.eventId).not.toBe(event2.eventId);
    });

    it('should include timestamp in event ID', () => {
      const beforeCreation = Date.now();
      const event = new UserEnrolledEvent('user123', 1);
      const afterCreation = Date.now();
      
      const eventIdTimestamp = parseInt(event.eventId.split('_')[1]);
      
      expect(eventIdTimestamp).toBeGreaterThanOrEqual(beforeCreation);
      expect(eventIdTimestamp).toBeLessThanOrEqual(afterCreation);
    });
  });

  describe('Event Data Integrity', () => {
    it('should preserve all data in UserEnrolledEvent', () => {
      const userId = 'user123';
      const lessonId = 42;
      const event = new UserEnrolledEvent(userId, lessonId);

      expect(event.data.userId).toBe(userId);
      expect(event.data.lessonId).toBe(lessonId);
      expect(event.aggregateId).toBe(userId);
    });

    it('should preserve all data in LessonCompletedEvent', () => {
      const userId = 'user123';
      const lessonId = 42;
      const subject = 'SCIENCE';
      const event = new LessonCompletedEvent(userId, lessonId, subject);

      expect(event.data.userId).toBe(userId);
      expect(event.data.lessonId).toBe(lessonId);
      expect(event.data.subject).toBe(subject);
      expect(event.aggregateId).toBe(userId);
    });

    it('should preserve all data in AchievementAwardedEvent', () => {
      const userId = 'user123';
      const achievementId = 'achievement456';
      const achievementName = 'Test Achievement';
      const points = 75;
      const event = new AchievementAwardedEvent(userId, achievementId, achievementName, points);

      expect(event.data.userId).toBe(userId);
      expect(event.data.achievementId).toBe(achievementId);
      expect(event.data.achievementName).toBe(achievementName);
      expect(event.data.points).toBe(points);
      expect(event.aggregateId).toBe(userId);
    });
  });
});
