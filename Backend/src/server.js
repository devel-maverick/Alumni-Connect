import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { app,server } from './lib/socket.js';
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/testRoute.js";
import clubsRoute from "./routes/clubs.js";
import userRoute from "./routes/user.js";
import opportunityRoute from "./routes/opportunity.js";
import messageRoutes from "./routes/message.route.js";
import meetingRoutes from "./routes/meeting.route.js";
dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// Routes
app.use("/", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/clubs", clubsRoute);
app.use("/api/users", userRoute);
app.use("/api/opportunities", opportunityRoute);
app.use('/api/messages', messageRoutes);
app.use("/api/meeting", meetingRoutes);
if(process.env.NODE_ENV==='production'){
        app.use(express.static(path.join(__dirname,'../frontend/dist')));
        app.get(/.*/,(_,res)=>{
                res.sendFile(path.join(__dirname,'../frontend/dist/index.html'))
        })}
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});