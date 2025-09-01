import prisma from "../../utils/prisma";
import { Achievement } from "../../domain/Achievement";
import { AchievementRuleFactory, LessonCompletionEvent } from "../../domain/AchievementRule";
import { AchievementAwardedEvent, EventHandler, LessonCompletedEvent } from "../../events/DomainEvent";
import { NatsEventPublisher } from "../../events/NatsEventPublisher";

// Note: User model is not available in achievement service schema
// This function should be removed or handled differently

export const GetAchievement = async () => {
    return await prisma.achievement.findMany({});
};

export const AwardAchievement = async (userId: string, achievementId: string) => {
    // Check if user already has this achievement
    const existingAchievement = await prisma.userAchievement.findUnique({
        where: {
            userId_achievementId: {
                userId,
                achievementId,
            },
        },
    });

    if (existingAchievement) {
        return existingAchievement; // Already awarded
    }

    // Get achievement details
    const achievement = await prisma.achievement.findUnique({
        where: { id: achievementId },
    });

    if (!achievement) {
        throw new Error('Achievement not found');
    }

    // Create user achievement record
    const userAchievement = await prisma.userAchievement.create({
        data: {
            userId,
            achievementId,
            points: achievement.points,
        },
    });

    // Update user stats
    await updateUserStats(userId, achievement.points, achievement.type);

    // Emit achievement awarded event
    const eventPublisher = new NatsEventPublisher();
    await eventPublisher.connect(process.env.NATS_URL || "nats://nats:4222");
    
    const event = new AchievementAwardedEvent(
        userId,
        achievementId,
        achievement.name,
        achievement.points
    );
    await eventPublisher.publish(event);
    
    await eventPublisher.disconnect();

    return userAchievement;
};

export const GetUserAchievements = async (userId: string) => {
    return await prisma.userAchievement.findMany({
        where: { userId },
        include: {
            achievement: true,
        },
    });
};

export const GetUserStats = async (userId: string) => {
    let userStats = await prisma.userStats.findUnique({
        where: { userId },
    });

    if (!userStats) {
        // Create initial stats
        userStats = await prisma.userStats.create({
            data: {
                userId,
                totalPoints: 0,
                totalAchievements: 0,
                bronzeCount: 0,
                silverCount: 0,
                goldCount: 0,
                platinumCount: 0,
            },
        });
    }

    return userStats;
};

// Event handler for lesson completion
export class LessonCompletedEventHandler implements EventHandler<LessonCompletedEvent> {
    async handle(event: LessonCompletedEvent): Promise<void> {
        console.log(`Handling lesson completion event for user ${event.data.userId}`);
        
        const userId = event.data.userId;
        const subject = event.data.subject;

        // Get user stats
        const userStats = await GetUserStats(userId);

        // Check all achievement rules
        const rules = AchievementRuleFactory.getAllRules();
        
        for (const rule of rules) {
            const canAward = await rule.canAward({
                userId,
                lessonId: event.data.lessonId,
                subject,
                completedAt: event.data.completedAt,
            });

            if (canAward) {
                // Find or create achievement
                let achievement = await prisma.achievement.findFirst({
                    where: {
                        type: rule.getAchievementType(),
                        category: rule.getCategory(),
                        isActive: true,
                    },
                });

                if (!achievement) {
                    // Create achievement if it doesn't exist
                    achievement = await prisma.achievement.create({
                        data: {
                            name: `${rule.getAchievementType()} ${rule.getCategory()}`,
                            description: `Awarded for ${rule.getCategory().toLowerCase()}`,
                            type: rule.getAchievementType(),
                            category: rule.getCategory(),
                            points: rule.getPoints(),
                            threshold: rule.getThreshold(),
                        },
                    });
                }

                // Award achievement
                await AwardAchievement(userId, achievement.id);
            }
        }
    }
}

// Helper function to update user stats
async function updateUserStats(userId: string, points: number, achievementType: string): Promise<void> {
    const updateData: any = {
        totalPoints: { increment: points },
        totalAchievements: { increment: 1 },
    };

    switch (achievementType) {
        case 'BRONZE':
            updateData.bronzeCount = { increment: 1 };
            break;
        case 'SILVER':
            updateData.silverCount = { increment: 1 };
            break;
        case 'GOLD':
            updateData.goldCount = { increment: 1 };
            break;
        case 'PLATINUM':
            updateData.platinumCount = { increment: 1 };
            break;
    }

    await prisma.userStats.upsert({
        where: { userId },
        update: updateData,
        create: {
            userId,
            totalPoints: points,
            totalAchievements: 1,
            bronzeCount: achievementType === 'BRONZE' ? 1 : 0,
            silverCount: achievementType === 'SILVER' ? 1 : 0,
            goldCount: achievementType === 'GOLD' ? 1 : 0,
            platinumCount: achievementType === 'PLATINUM' ? 1 : 0,
        },
    });
}