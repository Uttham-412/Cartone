const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { users, carts } = require("../data/db");

// register
const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    const existingUser = users.find(
        (user) =>
            user.email === email || user.username === username
    );

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
    };

    users.push(newUser);

    carts[newUser.id] = [];

    const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        },
    });
};

// login
const login = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    const user = users.find(
        (u) =>
            u.email === emailOrUsername ||
            u.username === emailOrUsername
    );

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    res.status(200).json({
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    });
};

module.exports = {
    register,
    login,
};