import prisma from "../../utils/prisma";
// Note: User model is not available in achievement service schema
// This function should be removed or handled differently

export const GetAchievement = async () => {
    return await prisma.achievement.findMany({});
};
