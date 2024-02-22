import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { protactRoute } from "../middlewares/protactedRoute.js";
const route = Router();
/* signup */
route.post("/send", protactRoute, sendMessage);
export default route;
