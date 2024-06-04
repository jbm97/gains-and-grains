const mongoose = require("mongoose");
require("dotenv").config();
console.log("--PRINT--", process.env.MONGO_URI);
// import models
const User = require("./user");
const Workout = require("./workouts");
const Food = require("./foodlog");
const Goal = require("./goals");
const Contact = require("./contact");

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.once("open", () => console.log(`Connected to MongoDB at Gains & Grains. PORT:${db.port}`));
db.on("error", (error) => console.log("Database error \n", error));

module.exports = {
    User,
    Workout,
    Food,
    Goal,
    Contact,
};
