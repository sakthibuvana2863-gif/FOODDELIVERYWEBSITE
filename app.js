const connectDB = require("./db");

async function main() {
    const db = await connectDB();

    const collection = db.collection("students");

    // Insert data
    await collection.insertOne({
        name: "buvana",
        dept: "CSE"
    });

    console.log("Data Inserted");
}

main();