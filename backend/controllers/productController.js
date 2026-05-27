const { products } = require("../data/db");

const getProducts = (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
        });
    }
};

module.exports = {
    getProducts,
};