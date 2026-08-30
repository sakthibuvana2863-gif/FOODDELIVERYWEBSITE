const express = require("express");

const router = express.Router();

router.post("/add-food", async (req, res) => {

    const db = req.app.locals.db;

    const { name, price, category, description, image } = req.body;

    await db.collection("foods").insertOne({
        name,
        price,
        category,
        description,
        image
    });

    res.json({
        message: "Food Added Successfully"
    });
});
router.get("/", async (req, res) => {

    const db = req.app.locals.db;

    const foods = await db.collection("foods").find().toArray();

    res.json(foods);
});

module.exports = router;