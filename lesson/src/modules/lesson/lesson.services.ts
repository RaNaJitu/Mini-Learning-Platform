import prisma from "../../utils/prisma";
import { Subject } from "@prisma/client";
import { Lesson } from "../../domain/Lesson";
import { LessonQueryBuilder, LessonQueryOptions } from "./lesson.query";
import { NatsEventPublisher } from "../../events/NatsEventPublisher";
import { UserEnrolledEvent, LessonCompletedEvent } from "../../events/DomainEvent";

// Note: User model is not available in lesson service schema
// This function should be removed or handled differently

export const CreateLesson = async (body: any) => {
    let { title, subject, grade } = body;

    // Create domain model for validation
    const lesson = Lesson.create({ title, subject, grade });

    const created = await prisma.lesson.create({
        data: lesson.toPersistence(),
    });

    return created;
};

export const GetLesson = async (queryOptions?: LessonQueryOptions) => {
    const queryBuilder = new LessonQueryBuilder(queryOptions);
    
    const where = queryBuilder.buildWhereClause();
    const orderBy = queryBuilder.buildOrderBy();
    const { skip, take } = queryBuilder.buildPagination();

    const [lessons, totalCount] = await Promise.all([
        prisma.lesson.findMany({
            where,
            orderBy,
            skip,
            take,
        }),
        prisma.lesson.count({ where }),
    ]);

    const totalPages = queryBuilder.getTotalPages(totalCount);

    return {
        lessons,
        pagination: {
            page: queryOptions?.pagination?.page || 1,
            limit: queryOptions?.pagination?.limit || 10,
            totalCount,
            totalPages,
        },
    };
};

export const UpdateLesson = async (id: number, body: any) => {
    const updated = await prisma.lesson.update({
        where: { id },
        data: body,
    });

    return updated;
};

export const DeleteLesson = async (id: number) => {
    const deleted = await prisma.lesson.delete({
        where: { id },
    });

    return deleted;
};

export const EnrollLesson = async (userId: number, lessonId: number) => {
    const enrollment = await prisma.enrollment.upsert({
        where: { userId_lessonId: { userId, lessonId } },
        update: {},
        create: { userId, lessonId },
    });

    // Emit domain event
    const eventPublisher = new NatsEventPublisher();
    await eventPublisher.connect(process.env.NATS_URL || "nats://nats:4222");
    
    const event = new UserEnrolledEvent(userId.toString(), lessonId);
    await eventPublisher.publish(event);
    
    await eventPublisher.disconnect();

    return enrollment;
};

export const CompleteLesson = async (
    userId: number,
    lessonId: number,
    subject: Subject
) => {
    const completion = await prisma.completion.create({
        data: { userId, lessonId, subject },
    });

    // Emit domain event
    const eventPublisher = new NatsEventPublisher();
    await eventPublisher.connect(process.env.NATS_URL || "nats://nats:4222");
    
    const event = new LessonCompletedEvent(userId.toString(), lessonId, subject);
    await eventPublisher.publish(event);
    
    await eventPublisher.disconnect();

    return completion;
};

export const FindLesson = async (lessonId: number) => {
    console.log("==LOG== ~ FindLesson ~ lessonId:", lessonId)
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
    });

    return lesson;
};
