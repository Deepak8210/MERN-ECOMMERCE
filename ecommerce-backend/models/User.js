import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: {
      type: String,
      required: true,
    },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
