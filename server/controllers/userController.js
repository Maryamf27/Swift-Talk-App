import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";

//sign up a new user
export const signup = async (req, res) => {
    const { email, fullName, password, bio } = req.body;

    try {
        if (!email || !fullName || !password || !bio) {
            return res.json({ success: false, message: "Missing details.." })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "Account Already Exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            email, bio, password: hashPassword, fullName
        });

        const token = generateToken(newUser._id);
        res.json({ success: true, userData: newUser, token, message: "Account created Successfully!" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//controller to login a user

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email })
        const isPassCorrect = await bcrypt.compare(password, userData.password)

        if (!isPassCorrect) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        const token = generateToken(userData._id)
        res.json({ success: true, userData, token, message: "Login Successfully!" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// controller to check if user is authenticated 
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user })
}


//Controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;
        let updatedUser;
        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { fullName, bio }, { new: true })
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true })
        }
        res.json({ success: true, user: updatedUser })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}