import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { UnauthorizedException } from "../exception/unauthorized.exception";
import { fmt } from "../config";
import { verifyJwt } from "../utils/jwt";


export const preUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    
    const decodeduser = await extractAndVerifyToken(request);
    
    // Store the decoded user data in request context
    (request.requestContext.set as any)("data", {
      ...decodeduser,
    });
  } catch (error: any) {
    console.log("Error preUserHandler: ===>", error);
    reply.status(401).send(
      fmt.formatError({
        message: error.message,
        description: error.description,
      })
    );
  }
};
export const extractAndVerifyToken = async (request: FastifyRequest) => {
  const token = request.headers.authorization;
  if (!token) {
    throw new UnauthorizedException(
      fmt.formatError({
        message: "Authentication Error!",
        description: "Authorization Token Required!",
      })
    );
  }

  if (typeof token !== "string") {
    throw new UnauthorizedException(
      fmt.formatError({
        message: "Authentication Error!",
        description: "The token is not in valid format!",
      })
    );
  }

  const auth_token = token.split(" ")[1]; // in format Bearer token
  const decodeduser = await verifyJwt(auth_token);
  return decodeduser;
};

