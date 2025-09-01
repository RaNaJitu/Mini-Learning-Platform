import { FastifyRequest } from "fastify";
import { BadRequestException } from "../../exception/badrequest.exception";
import { fmt } from "../../config";

export function getDataFromRequestContext(
    request: FastifyRequest,
    key: any
  ): any {
    const data = (request.requestContext.get as any)(key);
    
    if (!data) {
      throw new BadRequestException(
        fmt.formatError({ message: `${key} not found in request context` })
      );
    }
    return data?.data;
  }