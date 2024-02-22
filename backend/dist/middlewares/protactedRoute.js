import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protactRoute = async (req, res, next) => {
    try {
        const token = req.cookies.mcatoken;
        if (!token)
            return res.status(400).json({ error: "Please login first" });
        const verifyToken = jwt.verify(token, process.env.JWT_SECRETE);
        if (!verifyToken)
            return res.status(400).json({ error: "Unauthorized" });
        const user = (await User.findOne({
            _id: verifyToken.userId,
        }));
        if (!user)
            return res.status(400).json({ error: "Unauthorized" });
        req.body.user = user;
        next();
    }
    catch (error) {
        console.log("protectRouter error", error.message);
        return res.status(500).json({ error: error.message });
    }
};
