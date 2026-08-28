const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

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