// const userAchievementsResponse = {
//   200: {
//     description: "Successful response",
//     type: "object",
//     properties: {
//       data: {
//         type: "object",
//         properties: {
//           id: { type: "integer" },
//           email: { type: "string" },
//           role: { type: "string" },
//           createdAt: { type: "string" }

//         },
//       },
//       message: { type: "string" },
//       success: { type: "boolean" },
//       code: { type: "string" },
//     },
//   },
// };

const userAchievementsResponse = {
  200: {
    description: "Successful response",
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            type: { type: "string" }, // e.g., BRONZE, SILVER, GOLD
            category: { type: "string" }, // e.g., LESSON_COMPLETION, SUBJECT_MASTERY
            points: { type: "integer" },
            threshold: { type: "integer" },
            icon: { type: ["string", "null"] },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          
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
  // response: userAchievementsResponse,
};