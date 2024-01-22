const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Get site configuration
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               {"id":1,"client_name":"Demo","logo_path":"","logo_width":0,"logo_height":0,"primary_color":"#3f51b5","secondary_color":"#03dac6","background_color":"#15202b","surface_color":"#15202b"}
 *       500:
 *         description: Internal Server Error
 */
router.get("/", configController.getConfig);

/**
 * @swagger
 * /config:
 *   put:
 *     summary: Update site configuration
 *     tags: [Config]
 *     description: Allow admin to update site configuration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_name:
 *                 type: string
 *               logo_path:
 *                 type: string
 *               logo_width:
 *                 type: integer
 *               logo_height:
 *                 type: integer
 *               primary_color:
 *                 type: string
 *               secondary_color:
 *                 type: string
 *               background_color:
 *                 type: string
 *               surface_color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Configuration updated successfully
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal Server Error
 */
router.use(authenticateUser);
router.put("/", isAdmin, configController.updateConfig);

module.exports = router;
