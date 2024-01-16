// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const db = require("../db");
const config = require("../config");
const subscriptionModel = require("../models/subscriptionModel");
const moduleModel = require("../models/moduleModel");
const resourceModel = require("../models/resourceModel");

const authenticateUser = async (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    // if there is a token, make sure to slice out "Bearer: " part...
    token = token.slice(7);

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;

        // Check if the user type is USER or ADMIN
        if (req.user.user_type !== "USER" && req.user.user_type !== "ADMIN") {
            return res
                .status(403)
                .json({ error: "Forbidden - Unsupported user type" });
        }

        req.inaccessibleProductIds =
            req.user.user_type === "ADMIN"
                ? []
                : await subscriptionModel.getInaccessibleProductIds(
                      req.user.user_id
                  );

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};

const isAdmin = (req, res, next) => {
    // Check if the user type is ADMIN
    if (req.user.user_type !== "ADMIN") {
        return res
            .status(403)
            .json({ error: "Forbidden - Insufficient permissions" });
    }

    next();
};

const checkModuleAccess = async (req, res, next) => {
    const moduleId = parseInt(req.params.moduleId);

    try {
        const module = await moduleModel.getModuleById(moduleId);

        if (!module) {
            return res.status(404).json({ error: "Module not found" });
        }

        // Check if the associated product is accessible
        if (
            req.inaccessibleProductIds &&
            req.inaccessibleProductIds.includes(module.product_id)
        ) {
            return res
                .status(403)
                .json({ error: "Forbidden - Insufficient permissions" });
        }

        req.module = module;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const checkProductAccess = async (req, res, next) => {
    const productId = parseInt(req.params.productId);

    if (
        req.inaccessibleProductIds &&
        req.inaccessibleProductIds.includes(productId)
    ) {
        return res
            .status(403)
            .json({ error: "Forbidden - Insufficient permissions" });
    }
    next();
};

const checkResourcePreviewAccess = async (req, res, next) => {
    try {
        const resourceProductIds =
            await resourceModel.getResourceProductIdsByPath(req.originalUrl);

        if (
            req.inaccessibleProductIds &&
            resourceProductIds.filter(
                (pid) => !req.inaccessibleProductIds.includes(pid)
            ) <= 0 && req.user.user_type !== "ADMIN"
        ) {
            return res
                .status(403)
                .json({ error: "Forbidden - Insufficient permissions" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    authenticateUser,
    isAdmin,
    checkModuleAccess,
    checkProductAccess,
    checkResourcePreviewAccess,
};
