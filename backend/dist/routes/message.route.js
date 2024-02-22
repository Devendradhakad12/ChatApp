import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { protactRoute } from "../middlewares/protactedRoute.js";
const route = Router();
/* signup */
route.post("/:reciverId", protactRoute, sendMessage);
export default route;
