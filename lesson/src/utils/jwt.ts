import jwt, { JwtPayload } from "jsonwebtoken";
import { config, fmt } from "../config";
import { UnauthorizedException } from "../exception/unauthorized.exception";
interface ISignJwt {
  data: object;
  expiresIn?: string;
}


//expiry time and other parameters
export function signJwt(params: ISignJwt): string {
  const { data, expiresIn = "8h" } = params;

  return (jwt.sign as any)({ data }, config.jwt_secret, { expiresIn });
}

export function verifyJwt(token: string): JwtPayload {
  try {
    return jwt.verify(token, config.jwt_secret) as JwtPayload;
  } catch (error: any) {
    throw new UnauthorizedException(
      fmt.formatError({
        message: "Authentication Error!",
        description: error.name,
      })
    );
  }
}

export const parseJwt = (token: string): any => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    return decoded;
  } catch (error) {
    return null;
  }
};
