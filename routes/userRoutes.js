const express = require("express");
const bcrypt = require("bcrypt");
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
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
        name,
        email,
        password: hashedPassword
    });



    res.json({
        message: "User Registered Successfully"
    });
});
router.post("/login", async (req, res) => {

    const db = req.app.locals.db;

    const { email, password } = req.body;

    const user = await db.collection("users").findOne({
        email: email
    });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    res.json({
        message: "Login Successful"
    });
});

module.exports = router;