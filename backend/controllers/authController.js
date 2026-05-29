const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// REGISTER
const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;

        if (
            !username ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                message:
                    "All fields are required",
            });
        }

        const existingUser =
            await User.findOne({
                $or: [
                    { email },
                    { username },
                ],
            });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const newUser =
            await User.create({
                username,
                email,
                password:
                    hashedPassword,
            });

        const token = jwt.sign(
            {
                userId:
                    newUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    "24h",
            }
        );

        res.status(201).json({
            message:
                "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username:
                    newUser.username,
                email:
                    newUser.email,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                error.message,
        });
    }
};

// LOGIN
const login = async (
    req,
    res
) => {
    try {
        const {
            emailOrUsername,
            password,
        } = req.body;

        const user =
            await User.findOne({
                $or: [
                    {
                        email:
                            emailOrUsername,
                    },
                    {
                        username:
                            emailOrUsername,
                    },
                ],
            });

        if (!user) {
            return res.status(400).json({
                message:
                    "Invalid credentials",
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message:
                    "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                userId:
                    user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    "24h",
            }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username:
                    user.username,
                email:
                    user.email,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                error.message,
        });
    }
};

module.exports = {
    register,
    login,
};