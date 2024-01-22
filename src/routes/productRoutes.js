const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticateUser, isAdmin, checkProductAccess } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

router.use(authenticateUser);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all active products
 *     tags: [Products]
 *     description: Retrieve a list of all active products.
 *     responses:
 *       200:
 *         description: Successful retrieval of products
 *         content:
 *           application/json:
 *             example:
 *               {"free_products":[{"id":1,"title":"Free Product 1","unique_name":"free_product_1","position":1,"subscription_required":0,"active":1,"modules":[{"id":1,"title":"Title","description":"Description text","unique_name":"unique_module","position":1,"active":1,"product_id":1}]}],"subscription_products":[{"id":2,"title":"Paid Product 1","unique_name":"paid_product_1","position":2,"subscription_required":1,"active":1,"modules":[{"id":2,"title":"Title Paid","description":"Description text","unique_name":"unique_module","position":1,"active":1,"product_id":1}]}]}
 */
router.get("/", productController.getAllActiveProducts);

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: Successful retrieval of products
 *         content:
 *           application/json:
 *             example:
 *               {"free_products":[{"id":1,"title":"Free Product 1","unique_name":"free_product_1","position":1,"subscription_required":0,"active":1,"modules":[{"id":1,"title":"Title","description":"Description text","unique_name":"unique_module","position":1,"active":1,"product_id":1}]}],"subscription_products":[{"id":2,"title":"Paid Product 1","unique_name":"paid_product_1","position":2,"subscription_required":1,"active":1,"modules":[{"id":2,"title":"Title Paid","description":"Description text","unique_name":"unique_module","position":1,"active":1,"product_id":1}]}]}
 */
router.get("/all", isAdmin, productController.getAllProducts);

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     description: Retrieve details of a single product by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successful retrieval of a product
 *         content:
 *           application/json:
 *             example:
 *               {"id":1,"title":"Welcome","unique_name":"welcome","position":1,"subscription_required":0,"active":1,"modules":[{"id":4,"title":"Title","description":"Description text","unique_name":"unique_module","position":1,"active":1,"product_id":1}]}
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Product not found"
 */
router.get("/:productId", checkProductAccess, productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Create a new product with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               unique_name:
 *                 type: string
 *               position:
 *                 type: integer
 *               subscription_required:
 *                 type: integer
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 */
router.post("/", isAdmin, productController.createProduct);

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     description: Update an existing product with the provided details.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               unique_name:
 *                 type: string
 *               position:
 *                 type: integer
 *               subscription_required:
 *                 type: integer
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Product not found"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 */
router.put("/:productId", isAdmin, productController.updateProduct);

module.exports = router;
