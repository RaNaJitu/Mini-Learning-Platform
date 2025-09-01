import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";


export const LOGIN = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    

    reply.status(200).send(
      fmt.formatResponse(
        {
          name: "Rana",
          email: "rana@example.com"
        },
        "Login Successful!"
      )
    );
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
};
