const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const { authenticateUser, isAdmin, checkModuleAccess } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Operations related to resources
 */

router.use(authenticateUser);

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources.
 *     tags: [Resources]
 *     description: Retrieve a list of all resources.
 *     responses:
 *       200:
 *         description: Successful retrieval of resources.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { id: 1, original_name: 'file.txt', name: 'unique_name', path: '/uploads/unique_name', file_type: 'TEXT', display_name: 'custom_display_name' }
 *               ]
 *       500:
 *         description: Internal Server Error.
 */
router.get("/", isAdmin, resourceController.getAllResources);

/**
 * @swagger
 * /resources/module/{moduleId}:
 *   get:
 *     summary: Get resources by module ID.
 *     tags: [Resources]
 *     description: Retrieve a list of resources for a specific module by its ID.
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the module to retrieve resources for.
 *     responses:
 *       200:
 *         description: Successful retrieval of resources for the module.
 *         content:
 *           application/json:
 *             example:
 *               [{"id":1,"original_name":"file.txt","name":"unique_name","path":"/uploads/unique_name","file_type":"TEXT","display_name":"custom_display_name"}]
 *       500:
 *         description: Internal Server Error.
 */
router.get("/module/:moduleId", checkModuleAccess, resourceController.getResourcesByModule);

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Upload a resource.
 *     tags: [Resources]
 *     description: Upload a new resource to the server.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               display_name:
 *                 type: string
 *                 description: Display name for the resource. If not provided, defaults to original name.
 *     responses:
 *       201:
 *         description: Resource uploaded successfully.
 *       400:
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 *       500:
 *         description: Internal Server Error.
 */
router.post("/", isAdmin, resourceController.uploadResource);

/**
 * @swagger
 * /resources/{resourceId}:
 *   put:
 *     summary: Update resource display name.
 *     tags: [Resources]
 *     description: Update the display name of an existing resource.
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the resource to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               display_name:
 *                 type: string
 *                 description: New display name for the resource.
 *     responses:
 *       200:
 *         description: Resource display name updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               resource: { id: 1, original_name: 'file.txt', name: 'unique_name', path: '/uploads/unique_name', file_type: 'TEXT', display_name: 'updated_display_name' }
 *       404:
 *         description: Resource not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Resource not found"
 *       400:
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input"
 *       500:
 *         description: Internal Server Error.
 */
router.put("/:resourceId", isAdmin, resourceController.updateResource);

/**
 * @swagger
 * /resources/{resourceId}:
 *   delete:
 *     summary: Delete an existing resource.
 *     tags: [Resources]
 *     description: Delete an existing resource by its ID.
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the resource to delete.
 *     responses:
 *       204:
 *         description: Resource deleted successfully.
 *       404:
 *         description: Resource not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Resource not found"
 *       500:
 *         description: Internal Server Error.
 */
router.delete("/:resourceId", isAdmin, resourceController.deleteResource);

module.exports = router;
