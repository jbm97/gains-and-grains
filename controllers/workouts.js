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

// New workout page
router.get("/new", isLoggedIn, (req, res) => {
    res.render("workouts/new");
});

// POST new workout
router.post("/", isLoggedIn, async (req, res) => {
    try {
        // console.log("body:", req.body);
        const newWorkout = new Workout({
            userId: req.user._id,
            name: req.body.name,
            date: req.body.date,
            exercises: req.body.exercises,
        });
        await newWorkout.save();
        req.flash("success", "Workout added!");
        res.redirect("/user/workouts");
    } catch (error) {
        console.error("Error creating workout:", error);
        req.flash("error", "There was an error creating the workout. Please try again.");
        res.redirect("/user/workouts/new");
    }
});

// View specific workout
router.get("/:id", isLoggedIn, async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        // console.log("workout:", workout);
        res.render("workouts/show", { workout });
    } catch (error) {
        console.error("Error getting workout:", error);
        req.flash("error", "There was an error getting the workout. Please try again.");
        res.redirect("/user/workouts");
    }
});

// Edit workout page
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        res.render("workouts/edit", { workout });
    } catch (error) {
        console.error("Error getting workout:", error);
        req.flash("error", "There was an error getting the workout. Please try Again.");
        res.redirect("/user/workouts");
    }
});

// update workout (put)
router.put("/:id", isLoggedIn, async (req, res) => {
    try {
        await Workout.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            date: req.body.date,
            exercises: req.body.exercises,
        });
        req.flash("success", "Workout updated.");
        res.redirect("/user/workouts");
    } catch (error) {
        console.error("Error deleting workout:", error);
        req.flash("error", "There was an error deleting the workout. Please try again.");
        res.redirect("/user/workouts");
    }
});

// Export router
module.exports = router;
