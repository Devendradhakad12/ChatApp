import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.js";

export interface CustomJwt extends Request {
  token: string | JwtPayload;
  userId: string;
}
 

export const protactRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.mcatoken;
    if (!token) return res.status(400).json({ error: "Please login first" });
    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRETE!
    ) as CustomJwt;
    if (!verifyToken) return res.status(400).json({ error: "Unauthorized" });
    const user = (await User.findOne({
      _id: verifyToken.userId,
    })) as typeof User;
    if (!user) return res.status(400).json({ error: "Unauthorized" });
    req.body.user = user;
    next();
  } catch (error: any) {
    console.log("protectRouter error", error.message);
    return res.status(500).json({ error: error.message });
  }
};
