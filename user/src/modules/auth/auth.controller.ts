import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";
import { findUserByEmail, RegisterUser } from "./auth.services";
import { CustomException } from "../../exception/custom.exception";
import { z } from "zod";
import { signJwt } from "../../utils/jwt";
import { verifyPassword } from "../../utils/hash";
import { ForbiddenException } from "../../exception/forbidden.exception";

//#region REGISTER USER
export const REGISTER_USER = async (
    request: FastifyRequest<{
        Body: { email: string; password: string; role: string };
    }>,
    reply: FastifyReply
) => {
    try {
        const { email } = request.body;

        const exists = await findUserByEmail(email);

        if (exists) {
            throw new CustomException({
                status: 409,
                message: "Email is already exists",
                code: "E409",
            });
        }

        const createUser = await RegisterUser(request.body);

        reply
            .status(200)
            .send(
                fmt.formatResponse(createUser, "User Registration Successful!")
            );
    } catch (error: any) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
//#endregion

//#region LOGIN
export const LOGIN = async (
    request: FastifyRequest<{
        Body: { email: string; password: string };
    }>,
    reply: FastifyReply
) => {
    try {
        const { email, password } = request.body;

        const user = await findUserByEmail(email);

        if (!user) {
            throw new Error("Invalid Email");
        }
        
      if (!(await verifyPassword(password,user.password))) {
         throw new ForbiddenException(
        fmt.formatError({
          message: "Invalid Password!",
          description: "Invalid Password!",
        })
      );
      }
        const data = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        
        let accessToken = await signJwt({
            data,
        });

        reply.status(200).send(
            fmt.formatResponse(
                { accessToken, ...data },
                "Login Successful!"
            ));
    } catch (error: any) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
//#endregion
