import express from "express";
const app = express();

import authRoute from "../src/routes/authRoute.js"
import cookieParser from "cookie-parser"
import testRoute from "../src/routes/testRoute.js"

import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/", testRoute)
app.use("/api/auth", authRoute)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})