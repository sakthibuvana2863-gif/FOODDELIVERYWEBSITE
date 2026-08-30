const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/foods", foodRoutes);
app.use("/cart", cartRoutes);

async function startServer() {
    const db = await connectDB();

    app.locals.db = db;

    app.get("/", (req, res) => {
        res.send("Food Delivery API Running");
    });

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

startServer();