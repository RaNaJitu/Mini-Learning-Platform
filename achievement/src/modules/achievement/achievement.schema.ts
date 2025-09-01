const userAchievementsResponse = {
  200: {
    description: "Successful response",
    type: "object",
    properties: {
      data: {
        type: "object",
        properties: {
          id: { type: "integer" },
          email: { type: "string" },
          role: { type: "string" },
          createdAt: { type: "string" }

        },
      },
      message: { type: "string" },
      success: { type: "boolean" },
      code: { type: "string" },
    },
  },
};

export const userAchievementsSchema = {
  description: "User achievements details",
  tags: ["User"],
  summary: "User Achievements",
  security: [{ bearerAuth: [] }],
  response: userAchievementsResponse,
};