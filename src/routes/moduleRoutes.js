const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");
const {
    authenticateUser,
    isAdmin,
    checkModuleAccess,
} = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Operations related to modules
 */

router.use(authenticateUser);

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     description: Retrieve a list of all modules.
 *     responses:
 *       200:
 *         description: Successful retrieval of modules
 *         content:
 *           application/json:
 *             example:
 *               [{"id":1,"title":"Title","description":"Description text","unique_name":"unique_module","position":1,"active":1,"product_id":1,"product":{"id":1,"title":"Welcome","unique_name":"welcome","position":1,"subscription_required":0,"active":1},"resources":[{"id":10,"original_name":"some_video_file.mp4","name":"cb9f7932-4dcb-46c0-8422-aac6fc3b6b34.mp4","path":"/static/cb9f7932-4dcb-46c0-8422-aac6fc3b6b34.mp4","file_type":"VIDEO","display_name":"Display Name For Video"}]}]
 */
router.get("/", moduleController.getAllModules);

/**
 * @swagger
 * /modules/{moduleId}:
 *   get:
 *     summary: Get a single module by ID
 *     tags: [Modules]
 *     description: Retrieve details of a single module by its ID.
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the module to retrieve
 *     responses:
 *       200:
 *         description: Successful retrieval of a module
 *         content:
 *           application/json:
 *             example:
 *               {"id":1,"title":"Title","description":"Description text","unique_name":"unique_module","position":1,"active":1,"product_id":1,"product":{"id":1,"title":"Welcome","unique_name":"welcome","position":1,"subscription_required":0,"active":1},"resources":[{"id":10,"original_name":"some_video_file.mp4","name":"cb9f7932-4dcb-46c0-8422-aac6fc3b6b34.mp4","path":"/static/cb9f7932-4dcb-46c0-8422-aac6fc3b6b34.mp4","file_type":"VIDEO","display_name":"Display Name For Video"}]}
 *       404:
 *         description: Module not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Module not found"
 */
router.get("/:moduleId", checkModuleAccess, moduleController.getModuleById);

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     description: Create a new module with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               unique_name:
 *                 type: string
 *               position:
 *                 type: integer
 *               active:
 *                 type: boolean
 *               product_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Module created successfully
 *
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 */
router.post("/", isAdmin, moduleController.createModule);

/**
 * @swagger
 * /modules/{moduleId}:
 *   put:
 *     summary: Update an existing module
 *     tags: [Modules]
 *     description: Update an existing module with the provided details.
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the module to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               unique_name:
 *                 type: string
 *               position:
 *                 type: integer
 *               active:
 *                 type: boolean
 *               product_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Module updated successfully
 *       404:
 *         description: Module not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Module not found"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 */
router.put("/:moduleId", isAdmin, moduleController.updateModule);

module.exports = router;
