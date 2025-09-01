import { User, UserProps } from '../User';
import { Role } from '@prisma/client';

describe('User Domain Model', () => {
  describe('User.create()', () => {
    it('should create a valid user with all required fields', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: Role.STUDENT
      };

      const user = User.create(userData);

      expect(user.email).toBe('test@example.com');
      expect(user.role).toBe(Role.STUDENT);
      expect(user.id).toBe(0);
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('should create an admin user', () => {
      const userData = {
        email: 'admin@example.com',
        password: 'admin123',
        role: Role.ADMIN
      };

      const user = User.create(userData);

      expect(user.role).toBe(Role.ADMIN);
      expect(user.canCreateLesson()).toBe(true);
      expect(user.canManageUsers()).toBe(true);
    });

    it('should throw error for invalid email format', () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        role: Role.STUDENT
      };

      expect(() => User.create(userData)).toThrow('Invalid email format');
    });

    it('should throw error for email without @ symbol', () => {
      const userData = {
        email: 'testexample.com',
        password: 'password123',
        role: Role.STUDENT
      };

      expect(() => User.create(userData)).toThrow('Invalid email format');
    });

    it('should throw error for short password', () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        role: Role.STUDENT
      };

      expect(() => User.create(userData)).toThrow('Password must be at least 8 characters');
    });

    it('should throw error for empty password', () => {
      const userData = {
        email: 'test@example.com',
        password: '',
        role: Role.STUDENT
      };

      expect(() => User.create(userData)).toThrow('Password must be at least 8 characters');
    });

    it('should throw error for invalid role', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'INVALID_ROLE' as Role
      };

      expect(() => User.create(userData)).toThrow('Invalid role');
    });
  });

  describe('User.fromPersistence()', () => {
    it('should create user from persistence data', () => {
      const persistenceData: UserProps = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        role: Role.STUDENT,
        createdAt: new Date('2023-01-01')
      };

      const user = User.fromPersistence(persistenceData);

      expect(user.id).toBe(1);
      expect(user.email).toBe('test@example.com');
      expect(user.role).toBe(Role.STUDENT);
      expect(user.createdAt).toEqual(new Date('2023-01-01'));
    });
  });

  describe('Business Methods', () => {
    let studentUser: User;
    let adminUser: User;

    beforeEach(() => {
      studentUser = User.create({
        email: 'student@example.com',
        password: 'password123',
        role: Role.STUDENT
      });

      adminUser = User.create({
        email: 'admin@example.com',
        password: 'admin123',
        role: Role.ADMIN
      });
    });

    describe('enrollInLesson()', () => {
      it('should allow students to enroll in lessons', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        
        expect(() => studentUser.enrollInLesson(1)).not.toThrow();
        expect(consoleSpy).toHaveBeenCalledWith('User 0 enrolling in lesson 1');
        
        consoleSpy.mockRestore();
      });

      it('should throw error when admin tries to enroll in lesson', () => {
        expect(() => adminUser.enrollInLesson(1)).toThrow('Only students can enroll in lessons');
      });
    });

    describe('canCreateLesson()', () => {
      it('should return true for admin users', () => {
        expect(adminUser.canCreateLesson()).toBe(true);
      });

      it('should return false for student users', () => {
        expect(studentUser.canCreateLesson()).toBe(false);
      });
    });

    describe('canManageUsers()', () => {
      it('should return true for admin users', () => {
        expect(adminUser.canManageUsers()).toBe(true);
      });

      it('should return false for student users', () => {
        expect(studentUser.canManageUsers()).toBe(false);
      });
    });
  });

  describe('toPersistence()', () => {
    it('should convert user to persistence format', () => {
      const user = User.create({
        email: 'test@example.com',
        password: 'password123',
        role: Role.STUDENT
      });

      const persistenceData = user.toPersistence();

      expect(persistenceData).toEqual({
        id: 0,
        email: 'test@example.com',
        password: 'password123',
        role: Role.STUDENT,
        createdAt: expect.any(Date)
      });
    });
  });

  describe('Getters', () => {
    it('should return correct values for all getters', () => {
      const user = User.create({
        email: 'test@example.com',
        password: 'password123',
        role: Role.ADMIN
      });

      expect(user.id).toBe(0);
      expect(user.email).toBe('test@example.com');
      expect(user.role).toBe(Role.ADMIN);
      expect(user.createdAt).toBeInstanceOf(Date);
    });
  });
});
