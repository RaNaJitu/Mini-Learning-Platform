import { z } from "zod";

export const lessonBodySchema = z.object({
    title: z.string().min(1),
    subject: z.enum(["MATH", "SCIENCE", "ENGLISH", "HISTORY"]),
    grade: z.number().int().min(1),
});