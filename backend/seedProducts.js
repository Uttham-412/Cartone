require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
    {
        name: "Wireless Headphones",
        description:
            "Bluetooth over-ear headphones with noise cancellation.",
        price: 99.99,
        stock: 10,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
    {
        name: "Gaming Keyboard",
        description:
            "Mechanical keyboard with RGB lighting.",
        price: 79.99,
        stock: 8,
        image:
            "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
    },
    {
        name: "Smart Watch",
        description:
            "Fitness tracking smartwatch with heart-rate monitor.",
        price: 149.99,
        stock: 5,
        image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    },
    {
        name: "Laptop Backpack",
        description:
            "Durable backpack with laptop compartment.",
        price: 49.99,
        stock: 15,
        image:
            "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500",
    },
    {
        name: "Coffee Mug",
        description:
            "Ceramic coffee mug for everyday use.",
        price: 14.99,
        stock: 20,
        image:
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    },
    {
        name: "External SSD",
        description:
            "Portable high-speed external SSD storage.",
        price: 129.99,
        stock: 7,
        image:
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    },
    {
        name: "Bluetooth Speaker",
        description:
            "Portable wireless speaker with deep bass.",
        price: 59.99,
        stock: 12,
        image:
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500",
    },
    {
        name: "Running Shoes",
        description:
            "Comfortable lightweight running shoes.",
        price: 89.99,
        stock: 9,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
        name: "Desk Lamp",
        description:
            "Modern LED desk lamp with brightness control.",
        price: 39.99,
        stock: 14,
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500",
    },
    {
        name: "Phone Stand",
        description:
            "Adjustable aluminum phone stand for desk setup.",
        price: 19.99,
        stock: 25,
        image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    },
];

async function seedProducts() {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI
        );

        await Product.deleteMany();

        await Product.insertMany(
            products
        );

        console.log(
            "Products seeded successfully"
        );

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedProducts();