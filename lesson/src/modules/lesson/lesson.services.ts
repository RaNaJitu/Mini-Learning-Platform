import prisma from "../../utils/prisma";
import { Subject } from "@prisma/client";

// Note: User model is not available in lesson service schema
// This function should be removed or handled differently

export const CreateLesson = async (body: any) => {
    let { title, subject, grade } = body;

    const created = await prisma.lesson.create({
        data: { title, subject, grade },
    });

    return created;
};

export const GetLesson = async () => {
    return await prisma.lesson.findMany({});
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

    return enrollment;
};

export const CompleteLesson = async (
    userId: number,
    lessonId: number,
    subject: Subject
) => {
    const enrollment = await prisma.completion.create({
        data: { userId, lessonId, subject },
    });

    return enrollment;
};

export const FindLesson = async (lessonId: number) => {
    console.log("==LOG== ~ FindLesson ~ lessonId:", lessonId)
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
    });

    return lesson;
};
