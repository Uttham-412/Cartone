require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

console.log("connectDB =", connectDB);

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("PORT:", process.env.PORT);
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "CART One API is running",
    });
});

app.use("/products", productRoutes);
app.use("/", authRoutes);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});