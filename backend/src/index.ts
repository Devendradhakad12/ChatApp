import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./utils/db.js";
import AuthRoute from "./routes/auth.route.js";
import MessageRoute from "./routes/message.route.js";
import UsersRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoute);
app.use("/api/message", MessageRoute);
app.use("/api/users", UsersRoute);

app.get("*", (req, res) => {
  res.send("Welcome to the world of chat");
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectToDB();
  console.log(`app listen to http://localhost:${PORT}`);
});
