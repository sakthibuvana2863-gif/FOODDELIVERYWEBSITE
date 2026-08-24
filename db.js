const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log("MongoDB Connected");
        return client.db("studentDB");
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;