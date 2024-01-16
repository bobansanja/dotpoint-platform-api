const db = require("../db");

const createModuleResource = async (moduleId, resourceId) => {
    return await db("module_resources").insert({
        module_id: moduleId,
        resource_id: resourceId,
    });
};

const deleteModuleResource = async (moduleId, resourceId) => {
    return await db("module_resources")
        .where({ module_id: moduleId, resource_id: resourceId })
        .del();
};

const getResourcesByModuleId = async (moduleId) => {
    return await db("module_resources as mr")
        .select("r.*")
        .join("resources as r", "r.id", "=", "mr.resource_id")
        .where("mr.module_id", moduleId);
};

module.exports = {
    createModuleResource,
    deleteModuleResource,
    getResourcesByModuleId,
};
