import { Lesson, LessonProps } from '../Lesson';
import { Subject } from '@prisma/client';

describe('Lesson Domain Model', () => {
  describe('Lesson.create()', () => {
    it('should create a valid lesson with all required fields', () => {
      const lessonData = {
        title: 'Algebra Basics',
        subject: Subject.MATH,
        grade: 7
      };

      const lesson = Lesson.create(lessonData);

      expect(lesson.title).toBe('Algebra Basics');
      expect(lesson.subject).toBe(Subject.MATH);
      expect(lesson.grade).toBe(7);
      expect(lesson.id).toBe(0); // Default value before DB assignment
      expect(lesson.createdAt).toBeInstanceOf(Date);
    });

    it('should create lesson for different subjects', () => {
      const subjects = [Subject.MATH, Subject.SCIENCE, Subject.ENGLISH, Subject.HISTORY];
      
      subjects.forEach(subject => {
        const lesson = Lesson.create({
          title: `${subject} Lesson`,
          subject,
          grade: 5
        });

        expect(lesson.subject).toBe(subject);
      });
    });

    it('should create lesson for different grades', () => {
      const grades = [1, 5, 8, 12];
      
      grades.forEach(grade => {
        const lesson = Lesson.create({
          title: `Grade ${grade} Lesson`,
          subject: Subject.MATH,
          grade
        });

        expect(lesson.grade).toBe(grade);
      });
    });

    it('should throw error for empty title', () => {
      const lessonData = {
        title: '',
        subject: Subject.MATH,
        grade: 7
      };

      expect(() => Lesson.create(lessonData)).toThrow('Lesson title cannot be empty');
    });

    it('should throw error for whitespace-only title', () => {
      const lessonData = {
        title: '   ',
        subject: Subject.MATH,
        grade: 7
      };

      expect(() => Lesson.create(lessonData)).toThrow('Lesson title cannot be empty');
    });

    it('should throw error for invalid subject', () => {
      const lessonData = {
        title: 'Test Lesson',
        subject: 'INVALID_SUBJECT' as Subject,
        grade: 7
      };

      expect(() => Lesson.create(lessonData)).toThrow('Invalid subject');
    });

    it('should throw error for grade below 1', () => {
      const lessonData = {
        title: 'Test Lesson',
        subject: Subject.MATH,
        grade: 0
      };

      expect(() => Lesson.create(lessonData)).toThrow('Grade must be between 1 and 12');
    });

    it('should throw error for grade above 12', () => {
      const lessonData = {
        title: 'Test Lesson',
        subject: Subject.MATH,
        grade: 13
      };

      expect(() => Lesson.create(lessonData)).toThrow('Grade must be between 1 and 12');
    });
  });

  describe('Lesson.fromPersistence()', () => {
    it('should create lesson from persistence data', () => {
      const persistenceData: LessonProps = {
        id: 1,
        title: 'Algebra Basics',
        subject: Subject.MATH,
        grade: 7,
        createdAt: new Date('2023-01-01')
      };

      const lesson = Lesson.fromPersistence(persistenceData);

      expect(lesson.id).toBe(1);
      expect(lesson.title).toBe('Algebra Basics');
      expect(lesson.subject).toBe(Subject.MATH);
      expect(lesson.grade).toBe(7);
      expect(lesson.createdAt).toEqual(new Date('2023-01-01'));
    });
  });

  describe('Business Methods', () => {
    let lesson: Lesson;

    beforeEach(() => {
      lesson = Lesson.create({
        title: 'Algebra Basics',
        subject: Subject.MATH,
        grade: 7
      });
    });

    describe('updateTitle()', () => {
      it('should update title with valid input', () => {
        lesson.updateTitle('Advanced Algebra');
        expect(lesson.title).toBe('Advanced Algebra');
      });

      it('should trim whitespace from title', () => {
        lesson.updateTitle('  Advanced Algebra  ');
        expect(lesson.title).toBe('Advanced Algebra');
      });

      it('should throw error for empty title', () => {
        expect(() => lesson.updateTitle('')).toThrow('Lesson title cannot be empty');
      });

      it('should throw error for whitespace-only title', () => {
        expect(() => lesson.updateTitle('   ')).toThrow('Lesson title cannot be empty');
      });
    });

    describe('updateGrade()', () => {
      it('should update grade with valid input', () => {
        lesson.updateGrade(8);
        expect(lesson.grade).toBe(8);
      });

      it('should allow grade 1', () => {
        lesson.updateGrade(1);
        expect(lesson.grade).toBe(1);
      });

      it('should allow grade 12', () => {
        lesson.updateGrade(12);
        expect(lesson.grade).toBe(12);
      });

      it('should throw error for grade below 1', () => {
        expect(() => lesson.updateGrade(0)).toThrow('Grade must be between 1 and 12');
      });

      it('should throw error for grade above 12', () => {
        expect(() => lesson.updateGrade(13)).toThrow('Grade must be between 1 and 12');
      });
    });

    describe('isSuitableForGrade()', () => {
      it('should return true for same grade', () => {
        expect(lesson.isSuitableForGrade(7)).toBe(true);
      });

      it('should return true for grade within 1 level difference', () => {
        expect(lesson.isSuitableForGrade(6)).toBe(true);
        expect(lesson.isSuitableForGrade(8)).toBe(true);
      });

      it('should return false for grade with more than 1 level difference', () => {
        expect(lesson.isSuitableForGrade(5)).toBe(false);
        expect(lesson.isSuitableForGrade(9)).toBe(false);
      });

      it('should work for edge cases', () => {
        const grade1Lesson = Lesson.create({
          title: 'Grade 1 Lesson',
          subject: Subject.MATH,
          grade: 1
        });

        expect(grade1Lesson.isSuitableForGrade(1)).toBe(true);
        expect(grade1Lesson.isSuitableForGrade(2)).toBe(true);
        expect(grade1Lesson.isSuitableForGrade(3)).toBe(false);

        const grade12Lesson = Lesson.create({
          title: 'Grade 12 Lesson',
          subject: Subject.MATH,
          grade: 12
        });

        expect(grade12Lesson.isSuitableForGrade(12)).toBe(true);
        expect(grade12Lesson.isSuitableForGrade(11)).toBe(true);
        expect(grade12Lesson.isSuitableForGrade(10)).toBe(false);
      });
    });
  });

  describe('toPersistence()', () => {
    it('should convert lesson to persistence format', () => {
      const lesson = Lesson.create({
        title: 'Algebra Basics',
        subject: Subject.MATH,
        grade: 7
      });

      const persistenceData = lesson.toPersistence();

      expect(persistenceData).toEqual({
        id: 0,
        title: 'Algebra Basics',
        subject: Subject.MATH,
        grade: 7,
        createdAt: expect.any(Date)
      });
    });
  });

  describe('Getters', () => {
    it('should return correct values for all getters', () => {
      const lesson = Lesson.create({
        title: 'Algebra Basics',
        subject: Subject.SCIENCE,
        grade: 9
      });

      expect(lesson.id).toBe(0);
      expect(lesson.title).toBe('Algebra Basics');
      expect(lesson.subject).toBe(Subject.SCIENCE);
      expect(lesson.grade).toBe(9);
      expect(lesson.createdAt).toBeInstanceOf(Date);
    });
  });
});
