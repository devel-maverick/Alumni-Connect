import express from "express";
const router = express.Router();
import { testController } from "../controllers/testController.js";

router.get("/", testController );

export default router;