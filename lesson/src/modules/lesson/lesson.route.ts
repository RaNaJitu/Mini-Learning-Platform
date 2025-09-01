import { API_METHODS } from "../../interfaces/api.interface";
import { IRouteOptions } from "../../interfaces/fatstify.interface";
import { COMPLETE_LESSON, CREATE_LESSON, DELETE_LESSON, ENROLL_LESSON, GET_LESSON, UPDATE_LESSON } from "./lesson.controller";
import { preUserHandler } from "../../middleware";
import {
    completeSchema,
    createLessonSchema,
    deleteLessonSchema,
    enrollmentSchema,
    getLessonSchema,
    updateLessonSchema,
} from "./lesson.schema";
import { lessonBodySchema } from "./lesson.validation";
import { validator } from "../../utils/validator";

const UserRoutes: IRouteOptions<{
    Params: any;
    Body: any;
    Querystring: any;
}>[] = [
    {
        url: "/",
        handler: GET_LESSON,
        preHandler: [preUserHandler],
        // schema: getLessonSchema,
        method: API_METHODS.GET,
    },
    {
        url: "/",
        handler: CREATE_LESSON,
        preHandler: [preUserHandler],
        schema: createLessonSchema,
        validatorCompiler: validator({
            body: lessonBodySchema,
        }),
        method: API_METHODS.POST,
    },
    {
        url: "/:id",
        handler: UPDATE_LESSON,
        preHandler: [preUserHandler],
        schema: updateLessonSchema,
        method: API_METHODS.PATCH,
        },
    {
        url: "/:id",
        handler: DELETE_LESSON,
        preHandler: [preUserHandler],
        schema: deleteLessonSchema,
        method: API_METHODS.DELETE,
        },
    {
        url: "/:lessonId/enroll",
        handler: ENROLL_LESSON,
        preHandler: [preUserHandler],
        schema: enrollmentSchema,
        method: API_METHODS.POST,
    },
    {
        url: "/:lessonId/complete",
        handler: COMPLETE_LESSON,
        preHandler: [preUserHandler],
        schema: completeSchema,
        method: API_METHODS.POST,
    },
];

export default UserRoutes;
