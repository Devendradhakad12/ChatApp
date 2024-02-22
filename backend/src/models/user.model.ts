import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
  
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
