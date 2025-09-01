import { API_METHODS } from "../../interfaces/api.interface";
import { IRouteOptions } from "../../interfaces/fatstify.interface";
import { USER_PROFILE } from "./user.controller";
import { preUserHandler } from "../../middleware";
import { userProfileSchema } from "./user.schema";

const UserRoutes: IRouteOptions<{
    Params: any;
    Body: any;
    Querystring: any;
}>[] = [
    {
        url: "/me",
        handler: USER_PROFILE,
        preHandler: [preUserHandler],
        schema: userProfileSchema,
        method: API_METHODS.GET,
    },
    
];

export default UserRoutes;
