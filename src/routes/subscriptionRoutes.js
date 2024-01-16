const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Operations related to subscriptions
 */

router.use(authenticateUser);

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               expiration_date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Duplicate subscription not allowed
 *       500:
 *         description: Internal Server Error
 */
router.post("/", isAdmin, subscriptionController.subscribeUser);

/**
 * @swagger
 * /subscriptions/{subscriptionId}:
 *   put:
 *     summary: Update a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expiration_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
    "/subscriptions/:subscriptionId",
    isAdmin,
    subscriptionController.updateSubscription
);

/**
 * @swagger
 * /subscriptions/user/{userId}:
 *   get:
 *     summary: Get all subscriptions for a user
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               [{"id":1,"user_id":1,"product_id":1,"expiration_date":"2024-01-01"}]
 *       500:
 *         description: Internal Server Error
 */
router.get(
    "/user/:userId",
    isAdmin,
    subscriptionController.getAllSubscriptionsForUser
);

/**
 * @swagger
 * /subscriptions/{userId}/{productId}:
 *   delete:
 *     summary: Delete a subscription by user and product
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:userId/:productId', isAdmin, subscriptionController.deleteSubscription);

module.exports = router;
