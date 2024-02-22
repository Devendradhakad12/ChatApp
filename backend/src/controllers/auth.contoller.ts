import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import twilio from "twilio";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
dotenv.config();

const client = twilio(
  `AC${process.env.TWILIO_ACCOUNT_SID}`,
  process.env.TWILIO_AUTH_TOKEN
);

/* signup */
export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone, fullName, password } = req.body;
    if (!phone || !fullName || !password)
      return res.status(400).json({ error: "All fields required" });
    const userExists = await User.findOne({ phone });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    /* send otp */
    /*     const verification = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verifications.create({ to: `+91${phone}`, channel: "sms" }); */

    /* create user */
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      phone,
      fullName,
      password: hashPassword,
    });

    /* generate token */
    let token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRETE!, {
      expiresIn: "30d",
    });

    res
      .cookie("mcatoken", token, {
        maxAge: 24 * 60 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({
        message:"Signup successful", //`otp sent to +91${phone}`,
        user,
      });
  } catch (error: any) {
    console.log("SignUp Controller Error", error);
    res.status(500).json({ error: error.message });
  }
};

/* resend otp */
export const ResendOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    if (!phone)
      return res
        .status(400)
        .json({ error: "Phone Number is required for resend otp" });
    /* resend otp */
    const verification = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verifications.create({ to: `+91${phone}`, channel: "sms" });
    res.status(200).json({
      message: `otp send to +91${phone}`,
      status: verification.status,
    });
  } catch (error: any) {
    console.log("ResendOtp Controller Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

/* update wrong number */
export const UpdateWrongNumber = async (req: Request, res: Response) => {
  try {
    const { oldPhone, NewPhone } = req.body; // send old number from localstorage
    if (!oldPhone || !NewPhone)
      return res.status(400).json({ error: "Both Number are required" });
    const user = await User.findOne({ phone: oldPhone });
    if (user?.phone) {
      user.phone = NewPhone;
    }
    await user?.save();
    /* send otp */
    const verification = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verifications.create({ to: `+91${NewPhone}`, channel: "sms" });
    res.status(200).json({
      message: `otp send to +91${NewPhone}`,
      status: verification.status,
    });
  } catch (error: any) {
    console.log("updateWrongNumber Controller Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

/* verify user */
export const VerifyUser = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp)
      return res.status(400).json({ error: "Please enter phone and otp" });
    const verification_check = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to: `+91${phone} `, code: otp });
    if (verification_check.status === "pending")
      return res.json({ message: `Enter correct otp` });

    const user = await User.findOne({ phone });
    if (user?.verified === false) {
      user.verified = true;
    }
    await user?.save();

    /* generate token */
    let token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRETE!, {
      expiresIn: "30d",
    });
    res
      .cookie("mcatoken", token, {
        maxAge: 24 * 60 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Welcome to the chat world",
        status: verification_check.status,
        user,
      });
  } catch (error: any) {
    console.log("VerifyUser Controller Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

/* login */
export const Login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ error: "Please enter phone and password" });
    const user = await User.findOne({ phone });
    if (!user)
      return res.status(400).json({ error: "Wrong phone and password" });
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(400).json({ error: "Wrong phone and password" });
    /* generate token */
    let token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRETE!, {
      expiresIn: "30d",
    });

    res
      .cookie("mcatoken", token, {
        maxAge: 24 * 60 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login successful", user });
  } catch (error: any) {
    console.log("Login Controller Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

/* login with otp */
export const LoginWithOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    if (!phone)
      return res.status(400).json({ error: "Please enter phone number" });
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "Wrong phone number" });

    /* send otp */
    const verification = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verifications.create({ to: `+91${phone}`, channel: "sms" });
    res.status(200).json({
      message: `otp send to +91${phone}`,
      status: verification.status,
      user,
    });
  } catch (error: any) {
    console.log("LogigWithOtp Controller Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

/* verify login otp */
export const verifyLoginOtp = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;
    if (!otp) return res.status(400).json({ error: "Please enter otp" });
    if (!phone || !otp)
      return res
        .status(400)
        .json({ error: "Phone number and otp both required" });
    const verification_check = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to: `+91${phone} `, code: otp });
    if (verification_check.status === "pending")
      return res.json({ message: `Enter correct otp` });
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "Wrong phone number" });
    /* generate token */
    let token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRETE!, {
      expiresIn: "30d",
    });
    res
      .cookie("mcatoken", token, {
        maxAge: 24 * 60 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login successful" });
  } catch (error: any) {
    console.log("verifyLogin Controller Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

/* logout */
export const Logout = async (req: Request, res: Response) => {
  try {
    res
      .cookie("mcatoken", "", {
        maxAge: 0,
        httpOnly: true,
      })
      .status(200)
      .json({ message: "logout successful" });
  } catch (error: any) {
    console.log("Logout Controller Error", error.message);
    res.status(500).json({ error: error.message });
  }
};
