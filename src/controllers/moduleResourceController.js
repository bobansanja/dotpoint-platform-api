const moduleResourceModel = require("../models/moduleResourceModel");

const createModuleResource = async (req, res) => {
    try {
        const { module_id, resource_id } = req.body;

        if (!module_id || !resource_id) {
            return res.status(400).json({ error: "Invalid input" });
        }

        await moduleResourceModel.createModuleResource(module_id, resource_id);
        res.status(201).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteModuleResource = async (req, res) => {
    try {
        const { moduleId, resourceId } = req.params;

        if (!moduleId || !resourceId) {
            return res.status(400).json({ error: "Invalid input" });
        }

        await moduleResourceModel.deleteModuleResource(moduleId, resourceId);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createModuleResource,
    deleteModuleResource,
};
