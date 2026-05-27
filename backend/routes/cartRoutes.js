const express = require("express");

const router = express.Router();

const {
    getCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
} = require("../controllers/cartController");

const { verifyToken } = require("../middleware/auth");

// protect all cart routes
router.use(verifyToken);

router.get("/", getCart);

router.post("/add", addToCart);

router.patch("/update", updateCartQuantity);

router.delete("/remove/:productId", removeFromCart);

module.exports = router;