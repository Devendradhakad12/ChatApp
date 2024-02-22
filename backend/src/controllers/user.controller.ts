import { Request, Response } from "express";
import User from "../models/user.model.js";
import { CustomRequest } from "../middlewares/protactedRoute.js";

export const getAllUser = async (req: CustomRequest, res: Response) => {
  try {
    const loggedinUserId = req.user?._id;
    const users = await User.find({ _id: { $ne: loggedinUserId } });
    return res.status(200).json(users);
  } catch (error: any) {
    console.log("getAllUser", error.message);
    return res.status(500).json({ error: error.message });
  }
};
