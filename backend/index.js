import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import  authRoutes from './routes/authRoute.js';
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(cors());

app.use(bodyParser.json());


configDotenv();


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
app.use("/api/auth",authRoutes);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})