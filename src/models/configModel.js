const db = require("../db");

const getConfig = async () => {
    return db("config").first();
};

const updateConfig = async (newConfig) => {
    return db("config").update(newConfig);
};

module.exports = {
    getConfig,
    updateConfig,
};
