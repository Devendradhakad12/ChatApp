import { Router } from "express";
import { Login, ResendOtp, SignUp, UpdateWrongNumber, VerifyUser } from "../controllers/auth.contoller.js";
const route = Router();
/* signup */
route.post("/signup", SignUp);
route.post("/verify", VerifyUser);
route.post("/resend", ResendOtp);
route.post("/wrong-number", UpdateWrongNumber);
/* login */
route.post("/login", Login);
export default route;
