const express = require("express");

const router = express.Router();

router.post("/register", async (req, res) => {

    const db = req.app.locals.db;

    const { name, email, password } = req.body;

    const existingUser = await db.collection("users").findOne({
        email: email
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    await db.collection("users").insertOne({
        name,
        email,
        password
    });

    res.json({
        message: "User Registered Successfully"
    });
});

module.exports = router;