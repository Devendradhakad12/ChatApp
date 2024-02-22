import { Router } from "express";
import { getAllUser } from "../controllers/user.controller.js";
import { protactRoute } from "../middlewares/protactedRoute.js";

const route = Router();

route.get("/get", protactRoute, getAllUser);

export default route;
