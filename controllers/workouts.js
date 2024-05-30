const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { Workout } = require("../models");

// Fetch and display users workouts
router.get("/", isLoggedIn, async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user._id });
        res.render("workouts/index", { workouts });
    } catch (error) {
        console.error("Error getting workouts:", error);
        req.flash("error", "There was an error getting workouts. Please try again.");
        res.redirect("/");
    }
});

router.get("/new", (req, res) => {
    res.render("workouts/new");
});

// POST new workout
router.post("/", isLoggedIn, async (req, res) => {
    try {
        const newWorkout = new Workout({
            userId: req.user._id,
            name: req.body.name,
            date: req.body.date,
            // change
        });
        await newWorkout.save();
        req.flash("success", "Workout added!");
        res.redirect("/user/workouts");
    } catch (error) {
        console.error("Error creating workout:", error);
        req.flash("error", "There was an error creating the workout, try again.");
        res.redirect("/user/workouts/new");
    }
});

// Export router
module.exports = router;
