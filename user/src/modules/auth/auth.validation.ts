import { z } from "zod";

export const registerUserBodySchema = z.object({
    email: z
        .string()
        .email("Invalid email format")
        .min(6, "The email should have at least 6 characters or more.")
        .max(100, "The email cannot exceed more than 100 characters!"),
    password: z
        .string()
        .min(6, "The password should have at least 6 characters or more.")
        .max(16, "The password cannot exceed more than 16 characters!")
        .regex(
            /^[a-zA-Z0-9@!#$&]+$/,
            "The Password can only contain letters, numbers, and the symbols @, !, #, $, &"
        ),
    role: z.enum(["ADMIN", "STUDENT"]).optional(),
});

export const loginUserBodySchema = z.object({
    email: z
        .string()
        .email("Invalid email format"),
    password: z
        .string()
        .min(6, "The password should have at least 6 characters or more.")
        .max(16, "The password cannot exceed more than 16 characters!")
        .regex(
            /^[a-zA-Z0-9@!#$&]+$/,
            "The Password can only contain letters, numbers, and the symbols @, !, #, $, &"
        ),
});
