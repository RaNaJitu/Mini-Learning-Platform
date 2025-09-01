import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";
import { getDataFromRequestContext } from "./helper";
import { NotFoundException } from "../../exception/notfound.exception";
import { GetAchievement, GetUserAchievements, GetUserStats } from "./achievement.services";

//#region user achievement
export const USER_ACHIEVEMENT = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");

        // Note: User validation removed as user model is not available in achievement service

        const achievements = await GetAchievement();
        console.log("==LOG== ~ USER_ACHIEVEMENT ~ achievements:", achievements)
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

//#region user specific achievements
export const USER_SPECIFIC_ACHIEVEMENTS = async (
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");
        const userId = request.params.userId;

        const userAchievements = await GetUserAchievements(userId);
        const userStats = await GetUserStats(userId);

        reply
            .status(200)
            .send(
                fmt.formatResponse(
                    {
                        achievements: userAchievements,
                        stats: userStats,
                    },
                    "User Specific Achievements Fetched Successfully!"
                )
            );
    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
//#endregion

//#region user stats
export const USER_STATS = async (
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");
        const userId = request.params.userId;

        const userStats = await GetUserStats(userId);

        reply
            .status(200)
            .send(
                fmt.formatResponse(
                    userStats,
                    "User Stats Fetched Successfully!"
                )
            );
    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
//#endregion
