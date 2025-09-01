import { Role } from "@prisma/client";

export interface UserProps {
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: Omit<UserProps, 'id' | 'createdAt'>): User {
    // Domain validations
    if (!props.email || !props.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    
    if (!props.password || props.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    if (!Object.values(Role).includes(props.role)) {
      throw new Error('Invalid role');
    }

    return new User({
      ...props,
      id: 0,
      createdAt: new Date(),
    });
  }

  static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  // Getters
  get id(): number { return this.props.id; }
  get email(): string { return this.props.email; }
  get role(): Role { return this.props.role; }
  get createdAt(): Date { return this.props.createdAt; }

  // Business methods
  enrollInLesson(lessonId: number): void {
    if (this.props.role !== Role.STUDENT) {
      throw new Error('Only students can enroll in lessons');
    }
    // This would emit a domain event
    console.log(`User ${this.props.id} enrolling in lesson ${lessonId}`);
  }

  canCreateLesson(): boolean {
    return this.props.role === Role.ADMIN;
  }

  canManageUsers(): boolean {
    return this.props.role === Role.ADMIN;
  }

  private validateInvariants(): void {
    if (!this.props.email) {
      throw new Error('User must have an email');
    }
    if (!this.props.role) {
      throw new Error('User must have a role');
    }
  }

  toPersistence(): UserProps {
    return { ...this.props };
  }
}
