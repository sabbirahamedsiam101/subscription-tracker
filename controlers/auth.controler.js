import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env.js";
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // logic to create a new user
    const { name, email, password } = req.body;

    // existing user check
    const existing = await User.findOne({ email });

    if (existing) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    // if existing user not found then hash the password
    const salt = await bcrypt.genSalt(10); // generate 10 salted hash
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      {
        session,
      }
    );

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      mongoose: "User created successfully",
      data: {
        user: newUser[0],
        token,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid =await bcrypt.compare(password , user.password);
 
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        user,
        token,
      },
    });

  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  console.log("signOut");
};
