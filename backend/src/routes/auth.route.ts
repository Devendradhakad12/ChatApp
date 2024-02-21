import { Router } from "express";
import {
  Login,
  LoginWithOtp,
  Logout,
  ResendOtp,
  SignUp,
  UpdateWrongNumber,
  VerifyUser,
  verifyLoginOtp,
} from "../controllers/auth.contoller.js";

const route = Router();

/* signup */
route.post("/signup", SignUp);
route.post("/verify", VerifyUser);
route.post("/resend", ResendOtp);
route.post("/wrong-number", UpdateWrongNumber);

/* login */
route.post("/login", Login);
route.post("/otp-login", LoginWithOtp);
route.post("/verify-otp-login",verifyLoginOtp);


/* logout */
route.post("/logout", Logout);

export default route;
