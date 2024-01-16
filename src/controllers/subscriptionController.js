const subscriptionModel = require("../models/subscriptionModel");

const subscribeUser = async (req, res) => {
    const { user_id, product_id, expiration_date } = req.body;

    try {
        await subscriptionModel.createSubscription(
            user_id,
            product_id,
            expiration_date
        );
        res.status(201).json({ message: "Subscription created successfully" });
    } catch (error) {
        console.error(error);
        if (error.code === "ER_DUP_ENTRY") {
            return res
                .status(400)
                .json({ error: "Duplicate subscription not allowed" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateSubscription = async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const { expiration_date } = req.body;

    try {
        const subscription = await subscriptionModel.getSubscriptionById(
            subscriptionId
        );

        if (!subscription) {
            return res.status(404).json({ error: "Subscription not found" });
        }

        await subscriptionModel.updateSubscription(subscriptionId, {
            expiration_date,
        });
        res.status(200).json({ message: "Subscription updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllSubscriptionsForUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userSubscriptions =
            await subscriptionModel.getAllSubscriptionsByUserId(userId);
        res.status(200).json(userSubscriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteSubscription = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        // Check if the subscription exists
        const subscription =
            await subscriptionModel.getSubscriptionByUserAndProduct(
                userId,
                productId
            );

        if (!subscription) {
            return res.status(404).json({ error: "Subscription not found" });
        }

        // Delete the subscription
        await subscriptionModel.deleteSubscription(
            userId,
            productId
        );

        res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    subscribeUser,
    updateSubscription,
    getAllSubscriptionsForUser,
    deleteSubscription,
};
