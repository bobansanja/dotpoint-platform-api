const configModel = require("../models/configModel");

const getConfig = async (req, res) => {
    try {
        const config = await configModel.getConfig();
        res.status(200).json(config);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateConfig = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.user_type !== "ADMIN") {
            return res
                .status(403)
                .json({ error: "Forbidden - Insufficient permissions" });
        }

        const newConfig = req.body;
        await configModel.updateConfig(newConfig);
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getConfig,
    updateConfig,
};
