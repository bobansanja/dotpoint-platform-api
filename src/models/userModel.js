const db = require("../db");

const createUser = async (userData) => {
    const [userId] = await db("users").insert(userData);
    const newUser = await db("users").where({ id: userId }).first();
    return newUser;
};

const getUserByEmail = async (email) => {
    const user = await db("users").where({ email }).first();
    return user;
};

const getAllUsers = async () => {
    return db("users").select("*");
};

const getUserProducts = async (userId) => {
    const subscription = await db("subscriptions")
        .where({ user_id: userId })
        .where("expiration_date", ">", new Date())
        .pluck("product_id");

    const userProducts = await db("products")
        .whereIn("id", subscription)
        .orWhere({ subscription_required: 0 })
        .select("*");

    return userProducts;
};

const editUserProfile = async (userId, newData) => {
    await db("users").where({ id: userId }).update(newData);
};

const getUserById = async (userId) => {
    return db("users").where({ id: userId }).first();
};

const changeUserPassword = async (userId, newPassword) => {
    await db("users").where({ id: userId }).update({ password: newPassword });
};

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
    getUserProducts,
    editUserProfile,
    getUserById,
    changeUserPassword,
};
