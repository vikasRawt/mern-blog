import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

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
