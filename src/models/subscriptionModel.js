const db = require("../db");

const createSubscription = async (userId, productId, expirationDate) => {
    return db("subscriptions").insert({
        user_id: userId,
        product_id: productId,
        expiration_date: expirationDate,
    });
};

const getActiveSubscription = async (userId, productId) => {
    return db("subscriptions")
        .where({ user_id: userId, product_id: productId })
        .where("expiration_date", ">", new Date())
        .first();
};

const getAllSubscriptionsByUserId = async (userId) => {
    return db("subscriptions").where({ user_id: userId });
};

const getSubscriptionByUserAndProduct = async (userId, productId) => {
    return db("subscriptions").where({
        user_id: userId,
        product_id: productId,
    });
};

const deleteSubscription = async (userId, productId) => {
    return await db("subscriptions")
        .where({ user_id: userId, product_id: productId })
        .del();
};

const getInaccessibleProductIds = async (userId) => {
    const subscription = await db("subscriptions")
        .where({ user_id: userId })
        .where("expiration_date", ">", new Date())
        .pluck("product_id");

    const inaccessibleProductIds = await db("products")
        .where({subscription_required: 1})
        .whereNotIn("id", subscription)
        .pluck("id");

    return inaccessibleProductIds;
};

module.exports = {
    createSubscription,
    getActiveSubscription,
    getAllSubscriptionsByUserId,
    getSubscriptionByUserAndProduct,
    getInaccessibleProductIds,
    deleteSubscription,
};
