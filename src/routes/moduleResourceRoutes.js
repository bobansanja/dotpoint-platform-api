const express = require("express");
const router = express.Router();
const moduleResourceController = require("../controllers/moduleResourceController");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Module-Resource
 *   description: Operations related to the association between modules and resources
 */

router.use(authenticateUser);

/**
 * @swagger
 * /module-resources:
 *   post:
 *     summary: Create a new association between module and resource
 *     tags: [Module-Resource]
 *     description: Create a new association between a module and a resource.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module_id:
 *                 type: integer
 *               resource_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Module-Resource association created successfully
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 */
router.post("/", isAdmin, moduleResourceController.createModuleResource);

/**
 * @swagger
 * /module-resources/{moduleId}/{resourceId}:
 *   delete:
 *     summary: Delete the association between module and resource
 *     tags: [Module-Resource]
 *     description: Delete the association between a module and a resource by their IDs.
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the module
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the resource
 *     responses:
 *       204:
 *         description: Module-Resource association deleted successfully
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 */
router.delete(
    "/:moduleId/:resourceId",
    isAdmin,
    moduleResourceController.deleteModuleResource
);

module.exports = router;
