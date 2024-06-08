const mongoose = require("mongoose");

// import models
const User = require("./user");
const Workout = require("./workouts");
const Food = require("./foodlog");
const Goal = require("./goals");
const Contact = require("./contact");

const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };
async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);

module.exports = {
    User,
    Workout,
    Food,
    Goal,
    Contact,
};
