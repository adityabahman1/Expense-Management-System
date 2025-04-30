const jwt = require("jsonwebtoken")
const User = require("../models/user")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

exports.registerUser = async (req, res) => {
    const { fullname, email, password, profileImageUrl } = req.body;

    // ✅ Check for missing fields
    if (!fullname || !email || !password || !profileImageUrl) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // 🔎 Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // ✅ Create new user (make sure password is hashed in the model)
        const user = await User.create({
            fullname,
            email,
            password,
            profileImageUrl
        });

        // 🔐 Respond with token and user data
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error during registration", error: err.message });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

exports.getUserInfo = async (req, res) => { 
    try {
        const user  = await User.findById(req.user.id).select("-password")
        if (!user) {
            res.status(404).json({message:"User not found !"})
        }
        res.status(200).json({user})
    } catch (error) {
         console.error(error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
}