const express = require("express");

const router = express.Router();

router.post("/add", async (req, res) => {

    const db = req.app.locals.db;

    const { userEmail, foodName, price, quantity } = req.body;

    await db.collection("cart").insertOne({
        userEmail,
        foodName,
        price,
        quantity
    });

    res.json({
        message: "Item Added To Cart"
    });
});
router.get("/:userEmail", async (req, res) => {

    const db = req.app.locals.db;

    const userEmail = req.params.userEmail;

    const cartItems = await db
        .collection("cart")
        .find({ userEmail: userEmail })
        .toArray();

    res.json(cartItems);
});

module.exports = router;