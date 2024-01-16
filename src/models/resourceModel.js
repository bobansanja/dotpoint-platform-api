const db = require("../db");

const uploadResource = async (resourceData) => {
    const [resourceId] = await db("resources").insert(resourceData);
    const newResource = await db("resources").where({ id: resourceId }).first();
    return newResource;
};

const getAllResources = async () => {
    return await db("resources").select("*");
};

const getResourcesByModule = async (moduleId) => {
    return await db("resources").where({ module_id: moduleId });
};

const updateResourceDisplayName = async (resourceId, displayName) => {
    await db("resources")
        .where({ id: resourceId })
        .update({ display_name: displayName });
    const updatedResource = await db("resources")
        .where({ id: resourceId })
        .first();
    return updatedResource;
};

const deleteResource = async (resourceId) => {
    await db("resources").where({ id: resourceId }).del();
};

const getResourceById = async (resourceId) => {
    const resource = await db("resources").where({ id: resourceId }).first();
    return resource;
};

const getResourceProductIdsByPath = async (resourcePath) => {
    const productIds = await db("modules as m")
        .join("module_resources as mr", "m.id", "mr.module_id")
        .join("resources as r", "mr.resource_id", "r.id")
        .where("r.path", resourcePath)
        .pluck("m.product_id");

    return productIds || [];
};

module.exports = {
    uploadResource,
    getAllResources,
    getResourcesByModule,
    updateResourceDisplayName,
    deleteResource,
    getResourceById,
    getResourceProductIdsByPath,
};
