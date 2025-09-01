const userProfileResponse = {
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

export const userProfileSchema = {
  description: "User profile details",
  tags: ["User"],
  summary: "User Profile",
  security: [{ bearerAuth: [] }],
  response: userProfileResponse,
};