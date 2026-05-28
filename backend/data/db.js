const bcrypt = require("bcryptjs");
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "Bluetooth over-ear headphones with noise cancellation.",
        price: 99.99,
        stock: 10,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Gaming Keyboard",
        description: "Mechanical keyboard with RGB lighting.",
        price: 79.99,
        stock: 8,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"
    },
    {
        id: 3,
        name: "Smart Watch",
        description: "Fitness tracking smartwatch with heart-rate monitor.",
        price: 149.99,
        stock: 5,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500"
    }
];

const users = [
    {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: bcrypt.hashSync("password123", 10),
    },
];

const carts = {};

module.exports = {
    products,
    users,
    carts
};