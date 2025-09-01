import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";
import { findUserByEmail } from "../auth/auth.services";
import { getDataFromRequestContext } from "./helper";
import { NotFoundException } from "../../exception/notfound.exception";

//#region user profile
export const USER_PROFILE = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        let auth_user: any = getDataFromRequestContext(request, "data");

        const userData = await findUserByEmail(auth_user.email);
        if (!userData) {
            throw new NotFoundException(
                fmt.formatError({
                    message: "user not found!",
                    description: "user not found!",
                })
            );
        }

        reply
            .status(200)
            .send(
                fmt.formatResponse(
                    userData,
                    "User Profile Fetched Successfully!"
                )
            );
    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
//#endregion
