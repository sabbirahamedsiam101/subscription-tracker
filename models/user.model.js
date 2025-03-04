import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
    minlength: [2, "Name cannot be less than 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /\S+@\S+\.\S+/, // regular expression for email validation
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    trim: true,
    minlength: [6, "Password cannot be less than 6 characters"],
  },
} , {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;

