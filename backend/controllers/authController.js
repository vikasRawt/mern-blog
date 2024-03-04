import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
      password: hashedPass,
      email,
    });
    await newUser.save();
    res.json("signUp successful");
  } catch (error) {
    console.error("Error during signup:", error); // Add this line to see the error in the console
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === " " || password === " ") {
    return next(errorHandler(400, "All feilds required"));
  }
  try {
    const validuser = await User.findOne({ email });

    if (!validuser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validuser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid password or email"));
    }

    const token = jwt.sign(
      {
        id: validuser._id,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validuser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;
try {
  const user =await  User.findOne({ email });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // this way you can stop from password showing to the database:-
    const { password, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } else {
    const generatePassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8); //will generate 0.3443jnjbjb and with -8 last 8 char will be taken
   
    const hashedPass = bcryptjs.hashSync(generatePassword, 10);

    const newUser = new User({
      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPass,
      profilePicture: googlePhotoUrl,
    });

    await newUser.save();
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

    const{password, ...rest} = newUser._doc;

    res.status(200).cookie("access_token", token,{
      httpOnly: true,
    })
    .json(rest);
  }

} catch (error) {
  console.log("Server-side Error", error);
  if (error.response) {
    console.log("Server Response Data", error.response.data);
    console.log("Server Response Status Text", error.response.statusText);
  }
  res.status(500).json({ error: "Internal Server Error" });
}
};
