import { Subject } from "@prisma/client";

export interface LessonProps {
  id: number;
  title: string;
  subject: Subject;
  grade: number;
  createdAt: Date;
}

export class Lesson {
  private constructor(private props: LessonProps) {}

  static create(props: Omit<LessonProps, 'id' | 'createdAt'>): Lesson {
    // Domain validations
    if (!props.title || props.title.trim().length === 0) {
      throw new Error('Lesson title cannot be empty');
    }
    
    if (!Object.values(Subject).includes(props.subject)) {
      throw new Error('Invalid subject');
    }

    if (props.grade < 1 || props.grade > 12) {
      throw new Error('Grade must be between 1 and 12');
    }

    return new Lesson({
      ...props,
      id: 0, // Will be set by database
      createdAt: new Date(),
    });
  }

  static fromPersistence(props: LessonProps): Lesson {
    return new Lesson(props);
  }

  // Getters
  get id(): number { return this.props.id; }
  get title(): string { return this.props.title; }
  get subject(): Subject { return this.props.subject; }
  get grade(): number { return this.props.grade; }
  get createdAt(): Date { return this.props.createdAt; }

  // Business methods
  updateTitle(newTitle: string): void {
    if (!newTitle || newTitle.trim().length === 0) {
      throw new Error('Lesson title cannot be empty');
    }
    this.props.title = newTitle.trim();
  }

  updateGrade(newGrade: number): void {
    if (newGrade < 1 || newGrade > 12) {
      throw new Error('Grade must be between 1 and 12');
    }
    this.props.grade = newGrade;
  }

  isSuitableForGrade(grade: number): boolean {
    return Math.abs(this.props.grade - grade) <= 1; // Allow 1 grade difference
  }

  // Domain invariants
  private validateInvariants(): void {
    if (!this.props.title) {
      throw new Error('Lesson must have a title');
    }
    if (!this.props.subject) {
      throw new Error('Lesson must have a subject');
    }
    if (this.props.grade < 1 || this.props.grade > 12) {
      throw new Error('Lesson grade must be between 1 and 12');
    }
  }

  // Convert to persistence format
  toPersistence(): LessonProps {
    return { ...this.props };
  }
}
