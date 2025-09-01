import { FastifyReply, FastifyRequest, FastifyInstance  } from "fastify";
import { fmt } from "../../config";
import { getDataFromRequestContext } from "./helper";
import { NotFoundException } from "../../exception/notfound.exception";
import { ForbiddenException } from "../../exception/forbidden.exception";
import {
    CompleteLesson,
    CreateLesson,
    DeleteLesson,
    EnrollLesson,
    FindLesson,
    GetLesson,
    UpdateLesson,
} from "./lesson.services";
import { connect, StringCodec } from "nats";

const NATS_URL = process.env.NATS_URL || "nats://nats:4222";
const sc = StringCodec();

//#region GET LESSON
export const GET_LESSON = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");
        console.log("==LOG== ~ GET_LESSON ~ auth_user:", auth_user);

        // Note: User validation removed as user model is not available in lesson service
        const lessonData = await GetLesson();
        console.log("==LOG== ~ GET_LESSON ~ lessonData:", lessonData);
        reply
            .status(200)
            .send(
                fmt.formatResponse(lessonData, "Lesson Fetched Successfully!")
            );
    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
//#endregion

//#region CREATE LESSON
export const CREATE_LESSON = async (
    request: FastifyRequest<{
        Body: { title: string; subject: string; grade: string };
    }>,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");

        if (auth_user.role !== "ADMIN") {
            throw new ForbiddenException(
                fmt.formatError({
                    message: "Forbidden",
                    description: "Only admin can create lesson",
                })
            );
        }

        // Note: User validation removed as user model is not available in lesson service
        const created_lesson = await CreateLesson(request.body);

        reply
            .status(200)
            .send(
                fmt.formatResponse(
                    created_lesson,
                    "Lesson Created Successfully!"
                )
            );
    } catch (error) {
        console.log("CREATE_LESSON error:", error);
        return reply.code(500).send(error);
    }
};
//#endregion

//#region UPDATE LESSON
export const UPDATE_LESSON = async (
    request: FastifyRequest<{
        Body: { title: string; subject: string; grade: string };
        Params: { id: string };
    }>,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");

        if (auth_user.role !== "ADMIN") {
            throw new ForbiddenException(
                fmt.formatError({
                    message: "Forbidden",
                    description: "Only admin can create lesson",
                })
            );
        }

        // Note: User validation removed as user model is not available in lesson service
        const updatedLesson = await UpdateLesson(
            Number(request.params.id),
            request.body
        );

        reply
            .status(200)
            .send(
                fmt.formatResponse(
                    updatedLesson,
                    "Lesson Updated Successfully!"
                )
            );
    } catch (error) {
        console.log("CREATE_LESSON error:", error);
        return reply.code(500).send(error);
    }
};
//#endregion

//#region DELETE LESSON
export const DELETE_LESSON = async (
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");

        if (auth_user.role !== "ADMIN") {
            throw new ForbiddenException(
                fmt.formatError({
                    message: "Forbidden",
                    description: "Only admin can create lesson",
                })
            );
        }

        // Note: User validation removed as user model is not available in lesson service
        const deletedLesson = await DeleteLesson(Number(request.params.id));

        reply
            .status(200)
            .send(
                fmt.formatResponse(
                    deletedLesson,
                    "Lesson Deleted Successfully!"
                )
            );
    } catch (error) {
        console.log("DELETE_LESSON error:", error);
        return reply.code(500).send(error);
    }
};
//#endregion

//#region ENROLL LESSON
export const ENROLL_LESSON = async (
    request: FastifyRequest<{
        Querystring: { userId: string };
        Params: { lessonId: string };
    }>,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");
        console.log("==LOG== ~ ENROLL_LESSON ~ auth_user:", auth_user);

        if (auth_user.role !== "ADMIN") {
            throw new ForbiddenException(
                fmt.formatError({
                    message: "Forbidden",
                    description: "Only admin can enroll students to lesson",
                })
            );
        }

        // Note: User validation removed as user model is not available in lesson service
        const enrollment = await EnrollLesson(
            Number(request.query.userId),
            Number(request.params.lessonId)
        );

        reply
            .status(200)
            .send(fmt.formatResponse(enrollment, "Enroll Successfully!"));
    } catch (error) {
        console.log("CREATE_LESSON error:", error);
        return reply.code(500).send(error);
    }
};
//#endregion

//#region COMPLETE LESSON
export const COMPLETE_LESSON = async (
    request: FastifyRequest<{
        Querystring: { userId: string };
        Params: { lessonId: string };
    }>,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");

        if (auth_user.role !== "ADMIN") {
            throw new ForbiddenException(
                fmt.formatError({
                    message: "Forbidden",
                    description: "Only admin can create lesson",
                })
            );
        }

        // Note: User validation removed as user model is not available in lesson service

        const lesson = await FindLesson(Number(request.params.lessonId));
        if (!lesson) {
            throw new NotFoundException(
                fmt.formatError({
                    message: "lesson not found!",
                    description: "lesson not found!",
                })
            );
        }
        const completion = await CompleteLesson(
            Number(request.query.userId),
            Number(lesson.id),
            lesson.subject
        );
        // await app.nats.publish("lesson.completed", app.natsJson.encode(completion));
        reply
            .status(200)
            .send(
                fmt.formatResponse(completion, "Lesson Completed Successfully!")
            );
    } catch (error) {
        console.log("Complete Lesson error:", error);
        return reply.code(500).send(error);
    }
};
//#endregion
