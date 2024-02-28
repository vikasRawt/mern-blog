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

  try {
    const hashedPass = bcryptjs.hashSync(password, 10);
    console.log("Hashed Password:", hashedPass); // Add this line to see the hashed password

    const newUser = new User({
      username,
      password:hashedPass,
      email,
    });
    await newUser.save();
    res.json("signUp successful");
  } catch (error) {
    console.error("Error during signup:", error); // Add this line to see the error in the console
    next(error);
  }
};