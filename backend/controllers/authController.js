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



export const signIn = async (req,res,next)=>{
const{email, password} = req.body;

if(!email|| !password || email ===" " || password ===" "){
 return next(errorHandler(400,"All feilds required"));
}
try {
  const validuser = await User.findOne({email});

  if(!validuser){
   return next(errorHandler(404,"User not found"));
  }

  const validPassword = bcryptjs.compareSync(password,validuser.password);
  
  if(!validPassword){
   return next(errorHandler(400,"Invalid password or email"));
  }

  const token = jwt.sign({
    id:validuser._id
  }, process.env.JWT_SECRET);
  

  const {password : pass, ...rest} = validuser._doc;
  res.status(200).cookie('access_token', token,{
    httpOnly: true
  }).json(rest);
} catch (error) {
  next(error)
}
}