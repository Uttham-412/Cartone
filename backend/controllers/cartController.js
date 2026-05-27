const { carts, products } = require("../data/db");

// get cart
const getCart = (req, res) => {
    const userCart = carts[req.userId] || [];

    const cartWithDetails = userCart.map((item) => {
        const product = products.find(
            (p) => p.id === item.productId
        );

        return {
            ...product,
            quantity: item.quantity,
        };
    });

    res.status(200).json(cartWithDetails);
};

// add item
const addToCart = (req, res) => {
    const { productId, quantity } = req.body;

    const product = products.find(
        (p) => p.id === productId
    );

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

    if (!carts[req.userId]) {
        carts[req.userId] = [];
    }

    const existingItem = carts[req.userId].find(
        (item) => item.productId === productId
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        carts[req.userId].push({
            productId,
            quantity,
        });
    }

    res.status(200).json({
        message: "Item added to cart",
        cart: carts[req.userId],
    });
};

// update quantity
const updateCartQuantity = (req, res) => {
    const { productId, quantity } = req.body;

    const cartItem = carts[req.userId]?.find(
        (item) => item.productId === productId
    );

    if (!cartItem) {
        return res.status(404).json({
            message: "Cart item not found",
        });
    }

    cartItem.quantity = quantity;

    res.status(200).json({
        message: "Cart updated",
        cart: carts[req.userId],
    });
};

// remove item
const removeFromCart = (req, res) => {
    const productId = Number(req.params.productId);

    carts[req.userId] = carts[req.userId].filter(
        (item) => item.productId !== productId
    );

    res.status(200).json({
        message: "Item removed",
        cart: carts[req.userId],
    });
};

module.exports = {
    getCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
};