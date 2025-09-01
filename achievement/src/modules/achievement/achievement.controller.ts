import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";
import { getDataFromRequestContext } from "./helper";
import { NotFoundException } from "../../exception/notfound.exception";
import { GetAchievement } from "./achievement.services";

//#region user achievement
export const USER_ACHIEVEMENT = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");

        // Note: User validation removed as user model is not available in achievement service

        const achievements = await GetAchievement();
        reply
            .status(200)
            .send(
                fmt.formatResponse(
                    achievements,
                    "User Achievements Fetched Successfully!"
                )
            );
    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
//#endregion
