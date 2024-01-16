const { update } = require("../db");
const moduleModel = require("../models/moduleModel");
const moduleResourceModel = require("../models/moduleResourceModel");
const productModel = require("../models/productModel");

const getAllModules = async (req, res) => {
    try {
        const modules = await moduleModel.getAllModules();

        const modulesWithResources = await Promise.all(
            modules
                .filter(
                    (module) =>
                        !req.inaccessibleProductIds ||
                        !req.inaccessibleProductIds.includes(module.product_id)
                )
                .map(async (module) => {
                    module.product = await productModel.getProductById(
                        module.product_id
                    );
                    module.resources =
                        await moduleResourceModel.getResourcesByModuleId(
                            module.id
                        );
                    return module;
                })
        );

        res.json(modulesWithResources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getModuleById = async (req, res) => {
    try {
        const moduleId = parseInt(req.params.moduleId);
        const module = await moduleModel.getModuleById(moduleId);
        module.product = await productModel.getProductById(module.product_id);
        module.resources = await moduleResourceModel.getResourcesByModuleId(
            moduleId
        );

        if (!module) {
            return res.status(404).json({ error: "Module not found" });
        }

        res.json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createModule = async (req, res) => {
    try {
        const moduleData = req.body;
        const newModule = await moduleModel.createModule(moduleData);
        res.status(201).json();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid input" });
    }
};

const updateModule = async (req, res) => {
    try {
        const moduleId = parseInt(req.params.moduleId);
        const moduleData = req.body;
        const existingModule = await moduleModel.getModuleById(moduleId);

        if (!existingModule) {
            return res.status(404).json({ error: "Module not found" });
        }

        const updatedModule = await moduleModel.updateModule(
            moduleId,
            moduleData
        );
        res.json();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid input" });
    }
};

const deleteModule = async (req, res) => {
    try {
        const moduleId = parseInt(req.params.moduleId);
        const existingModule = await moduleModel.getModuleById(moduleId);

        if (!existingModule) {
            return res.status(404).json({ error: "Module not found" });
        }

        await moduleModel.deleteModule(moduleId);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
};
