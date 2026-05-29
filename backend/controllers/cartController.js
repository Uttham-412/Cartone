const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET CART
const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find({
            userId: req.userId,
        }).populate("productId");

        const formattedCart = cartItems.map((item) => ({
            ...item.productId.toObject(),
            quantity: item.quantity,
        }));

        res.status(200).json(formattedCart);
    } catch (error) {
        console.error("GET CART ERROR:");
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// ADD TO CART
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        console.log("===========");
        console.log("ADD TO CART");
        console.log("productId:", productId);
        console.log("userId:", req.userId);
        console.log("quantity:", quantity);
        console.log("===========");

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Not enough stock available",
            });
        }

        let existingItem = await Cart.findOne({
            userId: req.userId,
            productId,
        });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
        } else {
            await Cart.create({
                userId: req.userId,
                productId,
                quantity,
            });
        }

        res.status(200).json({
            message: "Item added to cart",
        });
    } catch (error) {
        console.error("ADD TO CART ERROR:");
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// UPDATE QUANTITY
const updateCartQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cartItem = await Cart.findOne({
            userId: req.userId,
            productId,
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found",
            });
        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            message: "Cart updated",
        });
    } catch (error) {
        console.error("UPDATE CART ERROR:");
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// REMOVE ITEM
const removeFromCart = async (req, res) => {
    try {
        const productId = req.params.productId;

        await Cart.findOneAndDelete({
            userId: req.userId,
            productId,
        });

        res.status(200).json({
            message: "Item removed",
        });
    } catch (error) {
        console.error("REMOVE CART ERROR:");
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
};