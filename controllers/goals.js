const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { Goal } = require("../models");

// display users goals
router.get("/", isLoggedIn, async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user._id });
        res.render("goals/index", { goals });
    } catch (error) {
        console.error("Error getting goals:", error);
        req.flash("error", "There was an error getting goals. Please try again.");
        res.redirect("/");
    }
});

// New goal page
router.get("/new", isLoggedIn, (req, res) => {
    res.render("goals/new");
});

// POST new goal
router.post("/", isLoggedIn, async (req, res) => {
    try {
        const newGoal = new Goal({
            userId: req.user._id,
            name: req.body.name,
            description: req.body.description,
            targetDate: req.body.targetDate
        });
        await newGoal.save();
        req.flash("success", "Goal added!");
        res.redirect("/user/goals");
    } catch (error) {
        console.error("Error creating goal:", error);
        req.flash("error", "There was an error creating the goal. Please try again.");
        res.redirect("/user/goals/new");
    }
});

// View goal
router.get("/:id", isLoggedIn, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        res.render("goals/show", { goal });
    } catch (error) {
        console.error("Error getting goal:", error);
        req.flash("error", "There was an error getting the goal. Please try again.");
        res.redirect("/user/goals");
    }
});

// Edit goal 
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        res.render("goals/edit", { goal });
    } catch (error) {
        console.error("Error getting goal:", error);
        req.flash("error", "There was an error getting the goal. Please try again.");
        res.redirect("/user/goals");
    }
});

// Update goal
router.put("/:id", isLoggedIn, async (req, res) => {
    try {
        await Goal.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            targetDate: req.body.targetDate,
            achieved: req.body.achieved
        });
        req.flash("success", "Goal updated.");
        res.redirect("/user/goals");
    } catch (error) {
        console.error("Error updating goal:", error);
        req.flash("error", "There was an error updating the goal. Please try again.");
        res.redirect("/user/goals");
    }
});

// Delete goal
router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        req.flash("success", "Goal deleted!");
        res.redirect("/user/goals");
    } catch (error) {
        console.error("Error deleting goal:", error);
        req.flash("error", "There was an error deleting the goal. Please try again.");
        res.redirect("/user/goals");
    }
});

// Export router
module.exports = router;
