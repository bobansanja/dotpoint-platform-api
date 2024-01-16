const db = require("../db");

const getAllModules = async () => {
    const modules = await db("modules").select("*");
    return modules;
};

const getModuleById = async (moduleId) => {
    const module = await db("modules").where({ id: moduleId }).first();
    return module;
};

const createModule = async (moduleData) => {
    const [moduleId] = await db("modules").insert(moduleData);
    const newModule = await db("modules").where({ id: moduleId }).first();
    return newModule;
};

const updateModule = async (moduleId, moduleData) => {
    await db("modules").where({ id: moduleId }).update(moduleData);
    const updatedModule = await db("modules").where({ id: moduleId }).first();
    return updatedModule;
};

const getModulesByProductId = async (productId) => {
    const modules = await db("modules").where({product_id: productId});
    return modules;
}

module.exports = {
    getAllModules,
    getModuleById,
    createModule,
    updateModule,
    getModulesByProductId,
};
