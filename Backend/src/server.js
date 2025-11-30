import express from "express";
import dotenv from "dotenv";
import testRoute from "./routes/testRoute.js"
dotenv.config();

const app = express();

app.use(express.json());

app.use("/", testRoute)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Port started at ${port}`);
});