import { LessonQueryBuilder, LessonQueryOptions, LessonFilters, LessonSortOptions, PaginationOptions } from '../lesson.query';
import { Subject } from '@prisma/client';

describe('LessonQueryBuilder', () => {
  describe('Constructor and Default Values', () => {
    it('should use default values when no options provided', () => {
      const builder = new LessonQueryBuilder();

      const where = builder.buildWhereClause();
      const orderBy = builder.buildOrderBy();
      const pagination = builder.buildPagination();

      expect(where).toEqual({});
      expect(orderBy).toEqual({ createdAt: 'desc' });
      expect(pagination).toEqual({ skip: 0, take: 10 });
    });

    it('should use provided options', () => {
      const options: LessonQueryOptions = {
        filters: { subject: Subject.MATH, grade: 7 },
        sort: { field: 'title', direction: 'asc' },
        pagination: { page: 2, limit: 5 }
      };

      const builder = new LessonQueryBuilder(options);

      const where = builder.buildWhereClause();
      const orderBy = builder.buildOrderBy();
      const pagination = builder.buildPagination();

      expect(where).toEqual({ subject: Subject.MATH, grade: 7 });
      expect(orderBy).toEqual({ title: 'asc' });
      expect(pagination).toEqual({ skip: 5, take: 5 });
    });
  });

  describe('buildWhereClause()', () => {
    it('should build empty where clause with no filters', () => {
      const builder = new LessonQueryBuilder();
      const where = builder.buildWhereClause();
      expect(where).toEqual({});
    });

    it('should filter by subject', () => {
      const options: LessonQueryOptions = {
        filters: { subject: Subject.MATH }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({ subject: Subject.MATH });
    });

    it('should filter by grade', () => {
      const options: LessonQueryOptions = {
        filters: { grade: 7 }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({ grade: 7 });
    });

    it('should filter by grade range with minGrade', () => {
      const options: LessonQueryOptions = {
        filters: { minGrade: 5 }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({ grade: { gte: 5 } });
    });

    it('should filter by grade range with maxGrade', () => {
      const options: LessonQueryOptions = {
        filters: { maxGrade: 8 }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({ grade: { lte: 8 } });
    });

    it('should filter by grade range with both min and max', () => {
      const options: LessonQueryOptions = {
        filters: { minGrade: 5, maxGrade: 8 }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({ grade: { gte: 5, lte: 8 } });
    });

    it('should prioritize exact grade over grade range', () => {
      const options: LessonQueryOptions = {
        filters: { grade: 7, minGrade: 5, maxGrade: 8 }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({ grade: 7 });
    });

    it('should filter by search text', () => {
      const options: LessonQueryOptions = {
        filters: { search: 'algebra' }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({
        title: {
          contains: 'algebra',
          mode: 'insensitive'
        }
      });
    });

    it('should combine multiple filters', () => {
      const options: LessonQueryOptions = {
        filters: {
          subject: Subject.MATH,
          minGrade: 5,
          maxGrade: 8,
          search: 'algebra'
        }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({
        subject: Subject.MATH,
        grade: { gte: 5, lte: 8 },
        title: {
          contains: 'algebra',
          mode: 'insensitive'
        }
      });
    });
  });

  describe('buildOrderBy()', () => {
    it('should use default sort (createdAt desc)', () => {
      const builder = new LessonQueryBuilder();
      const orderBy = builder.buildOrderBy();
      expect(orderBy).toEqual({ createdAt: 'desc' });
    });

    it('should sort by title ascending', () => {
      const options: LessonQueryOptions = {
        sort: { field: 'title', direction: 'asc' }
      };
      const builder = new LessonQueryBuilder(options);
      const orderBy = builder.buildOrderBy();

      expect(orderBy).toEqual({ title: 'asc' });
    });

    it('should sort by title descending', () => {
      const options: LessonQueryOptions = {
        sort: { field: 'title', direction: 'desc' }
      };
      const builder = new LessonQueryBuilder(options);
      const orderBy = builder.buildOrderBy();

      expect(orderBy).toEqual({ title: 'desc' });
    });

    it('should sort by subject', () => {
      const options: LessonQueryOptions = {
        sort: { field: 'subject', direction: 'asc' }
      };
      const builder = new LessonQueryBuilder(options);
      const orderBy = builder.buildOrderBy();

      expect(orderBy).toEqual({ subject: 'asc' });
    });

    it('should sort by grade', () => {
      const options: LessonQueryOptions = {
        sort: { field: 'grade', direction: 'desc' }
      };
      const builder = new LessonQueryBuilder(options);
      const orderBy = builder.buildOrderBy();

      expect(orderBy).toEqual({ grade: 'desc' });
    });

    it('should sort by createdAt', () => {
      const options: LessonQueryOptions = {
        sort: { field: 'createdAt', direction: 'asc' }
      };
      const builder = new LessonQueryBuilder(options);
      const orderBy = builder.buildOrderBy();

      expect(orderBy).toEqual({ createdAt: 'asc' });
    });
  });

  describe('buildPagination()', () => {
    it('should use default pagination (page 1, limit 10)', () => {
      const builder = new LessonQueryBuilder();
      const pagination = builder.buildPagination();

      expect(pagination).toEqual({ skip: 0, take: 10 });
    });

    it('should calculate skip correctly for page 1', () => {
      const options: LessonQueryOptions = {
        pagination: { page: 1, limit: 10 }
      };
      const builder = new LessonQueryBuilder(options);
      const pagination = builder.buildPagination();

      expect(pagination).toEqual({ skip: 0, take: 10 });
    });

    it('should calculate skip correctly for page 2', () => {
      const options: LessonQueryOptions = {
        pagination: { page: 2, limit: 10 }
      };
      const builder = new LessonQueryBuilder(options);
      const pagination = builder.buildPagination();

      expect(pagination).toEqual({ skip: 10, take: 10 });
    });

    it('should calculate skip correctly for page 3 with limit 5', () => {
      const options: LessonQueryOptions = {
        pagination: { page: 3, limit: 5 }
      };
      const builder = new LessonQueryBuilder(options);
      const pagination = builder.buildPagination();

      expect(pagination).toEqual({ skip: 10, take: 5 });
    });

    it('should handle large page numbers', () => {
      const options: LessonQueryOptions = {
        pagination: { page: 100, limit: 20 }
      };
      const builder = new LessonQueryBuilder(options);
      const pagination = builder.buildPagination();

      expect(pagination).toEqual({ skip: 1980, take: 20 });
    });
  });

  describe('getTotalPages()', () => {
    it('should calculate total pages correctly', () => {
      const builder = new LessonQueryBuilder();
      
      expect(builder.getTotalPages(0)).toBe(0);
      expect(builder.getTotalPages(5)).toBe(1);
      expect(builder.getTotalPages(10)).toBe(1);
      expect(builder.getTotalPages(11)).toBe(2);
      expect(builder.getTotalPages(20)).toBe(2);
      expect(builder.getTotalPages(21)).toBe(3);
    });

    it('should calculate total pages with custom limit', () => {
      const options: LessonQueryOptions = {
        pagination: { page: 1, limit: 5 }
      };
      const builder = new LessonQueryBuilder(options);
      
      expect(builder.getTotalPages(0)).toBe(0);
      expect(builder.getTotalPages(3)).toBe(1);
      expect(builder.getTotalPages(5)).toBe(1);
      expect(builder.getTotalPages(6)).toBe(2);
      expect(builder.getTotalPages(10)).toBe(2);
      expect(builder.getTotalPages(11)).toBe(3);
    });

    it('should handle edge cases', () => {
      const builder = new LessonQueryBuilder();
      
      expect(builder.getTotalPages(1)).toBe(1);
      expect(builder.getTotalPages(9)).toBe(1);
      expect(builder.getTotalPages(10)).toBe(1);
      expect(builder.getTotalPages(11)).toBe(2);
    });
  });

  describe('Complex Query Scenarios', () => {
    it('should handle complex filtering and sorting', () => {
      const options: LessonQueryOptions = {
        filters: {
          subject: Subject.SCIENCE,
          minGrade: 6,
          maxGrade: 10,
          search: 'biology'
        },
        sort: { field: 'title', direction: 'asc' },
        pagination: { page: 2, limit: 15 }
      };

      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();
      const orderBy = builder.buildOrderBy();
      const pagination = builder.buildPagination();

      expect(where).toEqual({
        subject: Subject.SCIENCE,
        grade: { gte: 6, lte: 10 },
        title: {
          contains: 'biology',
          mode: 'insensitive'
        }
      });
      expect(orderBy).toEqual({ title: 'asc' });
      expect(pagination).toEqual({ skip: 15, take: 15 });
    });

    it('should handle case-insensitive search', () => {
      const options: LessonQueryOptions = {
        filters: { search: 'ALGEBRA' }
      };
      const builder = new LessonQueryBuilder(options);
      const where = builder.buildWhereClause();

      expect(where).toEqual({
        title: {
          contains: 'ALGEBRA',
          mode: 'insensitive'
        }
      });
    });

    it('should handle all subjects', () => {
      const subjects = [Subject.MATH, Subject.SCIENCE, Subject.ENGLISH, Subject.HISTORY];
      
      subjects.forEach(subject => {
        const options: LessonQueryOptions = {
          filters: { subject }
        };
        const builder = new LessonQueryBuilder(options);
        const where = builder.buildWhereClause();

        expect(where).toEqual({ subject });
      });
    });
  });
});
