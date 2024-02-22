import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import { protactRoute } from "../middlewares/protactedRoute.js";
const route = Router();
/* signup */
route.post("/:reciverId", protactRoute, sendMessage);
route.get("/get/:id", protactRoute, getMessage);
export default route;
