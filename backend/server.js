require("dotenv").config();

const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "OrbitCart API is running",
    });
});

// product routes
app.use("/products", productRoutes);
// auth routes
app.use("/", authRoutes);
// cart routes
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});