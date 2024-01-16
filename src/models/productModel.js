const db = require("../db");

const getAllProducts = async () => {
    const products = await db("products").select("*");
    return products;
};

const getProductById = async (productId) => {
    const product = await db("products").where({ id: productId }).first();
    return product;
};

const createProduct = async (productData) => {
    const [productId] = await db("products").insert(productData);
    const newProduct = await db("products").where({ id: productId }).first();
    return newProduct;
};

const updateProduct = async (productId, productData) => {
    await db("products").where({ id: productId }).update(productData);
    const updatedProduct = await db("products")
        .where({ id: productId })
        .first();
    return updatedProduct;
};

const deleteProduct = async (productId) => {
    await db("products").where({ id: productId }).del();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
