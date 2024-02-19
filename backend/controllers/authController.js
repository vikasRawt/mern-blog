import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields required and correctly filled"));
  }

  const hashedPass = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPass,
  });

  try {
    await newUser.save();
    res.json("signUp successfull");
  } catch (error) {
    next(error);
  }
};
