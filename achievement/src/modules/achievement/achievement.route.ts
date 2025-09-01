import { API_METHODS } from "../../interfaces/api.interface";
import { IRouteOptions } from "../../interfaces/fatstify.interface";
import { USER_ACHIEVEMENT } from "./achievement.controller";
import { preUserHandler } from "../../middleware";
import { userAchievementsSchema } from "./achievement.schema";

const UserRoutes: IRouteOptions<{
    Params: any;
    Body: any;
    Querystring: any;
}>[] = [
    {
        url: "/me",
        handler: USER_ACHIEVEMENT,
        preHandler: [preUserHandler],
        schema: userAchievementsSchema,
        method: API_METHODS.GET,
    },
    
];

export default UserRoutes;
