const productModel = require("../models/productModel");
const moduleModel = require("../models/moduleModel");

const getAllActiveProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        const productsWithModules = await Promise.all(
            products
                .filter(
                    (product) =>
                        !req.inaccessibleProductIds ||
                        !req.inaccessibleProductIds.includes(product.id)
                )
                .map(async (product) => {
                    product.modules = await moduleModel.getModulesByProductId(
                        product.id
                    );
                    return product;
                })
        );

        const freeProducts = productsWithModules.filter((obj) => {
            return obj.subscription_required === 0;
        });
        const subscriptionProducts = productsWithModules.filter((obj) => {
            return obj.subscription_required === 1;
        });

        res.json({
            free_products: freeProducts,
            subscription_products: subscriptionProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts(false);
        const productsWithModules = await Promise.all(
            products
                .map(async (product) => {
                    product.modules = await moduleModel.getModulesByProductId(
                        product.id
                    );
                    return product;
                })
        );

        const freeProducts = productsWithModules.filter((obj) => {
            return obj.subscription_required === 0;
        });
        const subscriptionProducts = productsWithModules.filter((obj) => {
            return obj.subscription_required === 1;
        });

        res.json({
            free_products: freeProducts,
            subscription_products: subscriptionProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const product = await productModel.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        product.modules = await moduleModel.getModulesByProductId(productId);

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        await productModel.createProduct(productData);
        res.status(201).json();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid input" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const productData = req.body;
        const existingProduct = await productModel.getProductById(productId);

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        const updatedProduct = await productModel.updateProduct(
            productId,
            productData
        );
        updatedProduct.modules = await moduleModel.getModulesByProductId(
            productId
        );

        res.json();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid input" });
    }
};

module.exports = {
    getAllActiveProducts,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
};
