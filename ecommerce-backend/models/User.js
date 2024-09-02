import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first Name"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
    },
    password: {
      type: String,
      required: [true, "Please provide Password"],
    },
    profilePic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
