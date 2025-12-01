import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("All fields are required")
        }

        const key = String(email).toLowerCase().trim()

        const userAlreadyExists = await User.findOne({ email: key });

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await User.create({
            name: name.trim().charAt(0).toUpperCase() + name.trim().slice(1),
            email: key,
            password: hashedPassword
        });

        // jwt
        generateTokenAndSetCookie(res, createUser._id);

        const { password: _, ...userWithoutPassword } = createUser._doc;

        res.status(201).json({
            success: true,
            message: "user Created Successfully",
            user: userWithoutPassword
        })

    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}


export const login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const key = String(email).toLowerCase().trim()

        const findUser = await User.findOne({ email: key });

        if (!findUser) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const checkPassword = await bcrypt.compare(password, findUser.password)

        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        generateTokenAndSetCookie(res, findUser._id);

        await User.findOneAndUpdate({ email: key }, { lastLogin: new Date() });

        const { password: _, ...userWithoutPassword } = findUser._doc;

        res.status(200).json({
            success: true, message: "Logged in successfully",
            user: userWithoutPassword
        })
    }
    catch (err) {
        console.log(err)
    }
}

export const logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Logged out successfully" })
}


export const checkAuth = async (req, res) => {
    const id = req.userID
    try {
        const findUser = await User.findById(id);

        if (!findUser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const { password: _, ...userWithoutPassword } = findUser._doc;
        res.status(200).json({ success: true, user: userWithoutPassword })
    }
    catch (err) {
        throw new Error(err.message)
    }
}