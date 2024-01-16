const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../db");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

const registerUser = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.createUser({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            type: "USER", // default type for registered users
            active: true, // default active status for registered users
        });

        res.status(201).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { user_id: user.id, user_type: user.type },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRE_IN }
        );
        res.json({
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            type: user.type,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();

        const usersWithProducts = await Promise.all(
            users.map(async (user) => {
                // Get the products accessible by the user
                user.products = await userModel.getUserProducts(user.id);
                return user;
            })
        );

        res.status(200).json(usersWithProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
};
