//#region Lesson Schema
const getLessonResponse = {
  200: {
    description: "Successful response",
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            subject: { type: "string" },
            grade: { type: "integer" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
      },
      message: { type: "string" },
      success: { type: "boolean" },
      code: { type: "string" },
    },
  }
}

export const getLessonSchema = {
  description: "Get lesson details",
  tags: ["Lesson"],
  summary: "Get Lesson",
  security: [{ bearerAuth: [] }],
  response: getLessonResponse,
};
//#endregion

//#region Create Lesson
const createLessonResponse = {
  201: {
    description: "Successful response",
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            subject: { type: "string" },
            grade: { type: "integer" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
      },
      message: { type: "string" },
      success: { type: "boolean" },
      code: { type: "string" },
    },
  }
}

const createLessonBody = {
  type: "object",
  required: ["title", "subject", "grade"],
  properties: {
    title: {
      type: "string",
      minLength: 4,
      default: "example lesson"
    },
    subject: {
      type: "string",
      minLength: 4,
      default: "Mathematics"
    },
    grade: {
      type: "integer",
      minimum: 1,
      maximum: 12,
      default: 5
    }
  },
};

export const createLessonSchema = {
  description: "Create lesson",
  tags: ["Lesson"],
  summary: "Create Lesson",
  security: [{ bearerAuth: [] }],
  body: createLessonBody,
  response: createLessonResponse,
};
//#endregion

//#region Update Lesson
const updateLessonResponse = {
  200: {
    description: "Successful response",
    type: "object",
    properties: {
      data: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            subject: { type: "string" },
            grade: { type: "integer" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
      },
      message: { type: "string" },
      success: { type: "boolean" },
      code: { type: "string" },
    },
  }
}

const updateLessonBody = {
  type: "object",
  // required: ["title"],
  additionalProperties: false,
  properties: {
    title: {
      type: "string",
      minLength: 4,
      default: "example lesson"
    },
    subject: {
      type: "string",
      minLength: 4,
      default: "Mathematics"
    },
    grade: {
      type: "integer",
      minimum: 1,
      maximum: 12,
      default: 5
    }
  },
};

export const updateLessonSchema = {
  description: "Update lesson details",
  tags: ["Lesson"],
  summary: "Update Lesson",
  security: [{ bearerAuth: [] }],
  body: updateLessonBody,
  response: updateLessonResponse,
};
//#endregion

//#region Delete Lesson
const deleteLessonResponse = {
  200: {
    description: "Successful response",
    type: "object",
    properties: {
      data: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            subject: { type: "string" },
          },
      },
      message: { type: "string" },
      success: { type: "boolean" },
      code: { type: "string" },
    },
  }
}

const deleteLessonBody = {
  type: "object",
  // required: ["title"],
  additionalProperties: false,
  // properties: {
  //   title: {
  //     type: "string",
  //     minLength: 4,
  //     default: "example lesson"
  //   },
  //   subject: {
  //     type: "string",
  //     minLength: 4,
  //     default: "Mathematics"
  //   },
  //   grade: {
  //     type: "integer",
  //     minimum: 1,
  //     maximum: 12,
  //     default: 5
  //   }
  // },
};

export const deleteLessonSchema = {
  description: "Delete lesson",
  tags: ["Lesson"],
  summary: "Delete Lesson",
  security: [{ bearerAuth: [] }],
  // body: deleteLessonBody,
  response: deleteLessonResponse,
};
//#endregion


//#region Enrollment Lesson
const enrollmentResponse = {
  201: {
    description: "Successful response",
    type: "object",
    properties: {
      data: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "string" },
            // subject: { type: "string" },
            // grade: { type: "integer" },
            // createdAt: { type: "string" },
            // updatedAt: { type: "string" },
          },
      },
      message: { type: "string" },
      success: { type: "boolean" },
      code: { type: "string" },
    },
  }
}


export const enrollmentSchema = {
  description: "Create lesson",
  tags: ["Lesson"],
  summary: "Create Lesson",
  security: [{ bearerAuth: [] }],
  // body: createLessonBody,
   query: {
    userId: { type: "integer" }
  },
  response: enrollmentResponse,
};
//#endregion

//#region Complete Lesson
const completeResponse = {
  201: {
    description: "Successful response",
    type: "object",
    properties: {
      data: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "integer" },
            lessonId: { type: "integer" },
            // createdAt: { type: "string" },
          },
      },
      message: { type: "string" },
      success: { type: "boolean" },
      code: { type: "string" },
    },
  }
}


export const completeSchema = {
  description: "Complete lesson",
  tags: ["Lesson"],
  summary: "Complete Lesson",
  security: [{ bearerAuth: [] }],
  // body: createLessonBody,
  query: {
    userId: { type: "integer" }
  },
  response: completeResponse,
};
//#endregion