import { Subject } from "@prisma/client";

export interface LessonFilters {
  subject?: Subject;
  grade?: number;
  minGrade?: number;
  maxGrade?: number;
  search?: string;
}

export interface LessonSortOptions {
  field: 'title' | 'subject' | 'grade' | 'createdAt';
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface LessonQueryOptions {
  filters?: LessonFilters;
  sort?: LessonSortOptions;
  pagination?: PaginationOptions;
}

export class LessonQueryBuilder {
  private filters: LessonFilters = {};
  private sort: LessonSortOptions = { field: 'createdAt', direction: 'desc' };
  private pagination: PaginationOptions = { page: 1, limit: 10 };

  constructor(options: LessonQueryOptions = {}) {
    if (options.filters) this.filters = options.filters;
    if (options.sort) this.sort = options.sort;
    if (options.pagination) this.pagination = options.pagination;
  }

  buildWhereClause(): any {
    const where: any = {};

    if (this.filters.subject) {
      where.subject = this.filters.subject;
    }

    if (this.filters.grade) {
      where.grade = this.filters.grade;
    } else {
      if (this.filters.minGrade !== undefined) {
        where.grade = { ...where.grade, gte: this.filters.minGrade };
      }
      if (this.filters.maxGrade !== undefined) {
        where.grade = { ...where.grade, lte: this.filters.maxGrade };
      }
    }

    if (this.filters.search) {
      where.title = {
        contains: this.filters.search,
        mode: 'insensitive',
      };
    }

    return where;
  }

  buildOrderBy(): any {
    return {
      [this.sort.field]: this.sort.direction,
    };
  }

  buildPagination(): { skip: number; take: number } {
    const skip = (this.pagination.page - 1) * this.pagination.limit;
    const take = this.pagination.limit;
    return { skip, take };
  }

  getTotalPages(totalCount: number): number {
    return Math.ceil(totalCount / this.pagination.limit);
  }
}
