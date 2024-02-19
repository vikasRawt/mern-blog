import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import  authRoutes from './routes/authRoute.js'

configDotenv();

const app = express();

app.use(express.json());

let PORT = process.env.PORT;

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, (req, res) => {
  console.log("server running!!");
});

app.use("/api/user",userRoutes);
app.use("/api/user",authRoutes);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})