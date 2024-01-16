const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Register a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful registration
 */
router.post("/register", userController.registerUser);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Users]
 *     description: Authenticate the user and receive a JWT token for further API access.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               {"email":"demo@mail.com","first_name":"Demo","last_name":"Dot","type":"USER","token":""}
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid credentials"
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               [{"id":1,"email":"user1@mail.com","first_name":"User","last_name":"One","type":"USER","active":true,"products":[{"id":1,"title":"Product 1","unique_name":"uniq_1","position":1,"subscription_required":0,"active":1}]},{"id":2,"email":"user2@mail.com","first_name":"User","last_name":"Two","type":"USER","active":true,"products":[{"id":2,"title":"Product 2","unique_name":"uniq_2","position":2,"subscription_required":1,"active":1}]}]
 *       500:
 *         description: Internal Server Error
 */
router.use(authenticateUser);
router.get("/", isAdmin, userController.getAllUsers);

module.exports = router;
