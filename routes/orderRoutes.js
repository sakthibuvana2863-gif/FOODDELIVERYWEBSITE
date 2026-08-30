const express = require("express");

const router = express.Router();

router.post("/place-order", async (req, res) => {

    const db = req.app.locals.db;

    const { userEmail } = req.body;

    const cartItems = await db
        .collection("cart")
        .find({ userEmail })
        .toArray();

    let totalAmount = 0;

    cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
    });

    await db.collection("orders").insertOne({
        userEmail,
        items: cartItems,
        totalAmount,
        orderStatus: "Placed",
        orderDate: new Date()
    });

    await db.collection("cart").deleteMany({
        userEmail
    });

    res.json({
        message: "Order Placed Successfully"
    });
});
router.get("/:userEmail", async (req, res) => {

    const db = req.app.locals.db;

    const userEmail = req.params.userEmail;

    const orders = await db
        .collection("orders")
        .find({ userEmail })
        .toArray();

    res.json(orders);
});

module.exports = router;