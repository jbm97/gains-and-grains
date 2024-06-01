const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { Food } = require("../models");

// Fetch and display users food logs
router.get("/", isLoggedIn, async (req, res) => {
    try {
        const foodLogs = await Food.find({ userId: req.user._id });
        res.render("foodLogs/index", { foodLogs });
    } catch (error) {
        console.error("Error getting food logs:", error);
        req.flash("error", "There was an error getting food logs. Please try again.");
        res.redirect("/");
    }
});

// New food log page
router.get("/new", isLoggedIn, (req, res) => {
    res.render("foodLogs/new");
});

// POST new food log
router.post("/", isLoggedIn, async (req, res) => {
    try {
        const newFoodLog = new Food({
            userId: req.user._id,
            meals: req.body.meals,
        });
        await newFoodLog.save();
        req.flash("success", "Food log added!");
        res.redirect("/user/food-log");
    } catch (error) {
        console.error("Error creating the food log:", error);
        req.flash("error", "There was an error creating the food log. Please try again.");
        res.redirect("/user/food-log/new");
    }
});

// View specific food log
router.get("/:id", isLoggedIn, async (req, res) => {
    try {
        const foodLog = await Food.findO(req.params.id);
        res.render("foodLogs/show", { foodLog });
    } catch (error) {
        console.error("Error getting the food log:", error);
        req.flash("error", "There was an error getting the food log. Please try again.");
        res.redirect("/user/food-log");
    }
});

// Edit food log page
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    try {
        const foodLog = await Food.findById(req.params.id);
        res.render("foodLogs/edit", { foodLog });
    } catch (error) {
        console.error("Error getting the food log:", error);
        req.flash("error", "There was an error getting the food log. Please try Again.");
        res.redirect("/user/food-log");
    }
});

// Update food log (put)
router.put("/:id", isLoggedIn, async (req, res) => {
    try {
        await Food.findByIdAndUpdate(req.params.id, {
            meals: req.body.meals,
        });
        req.flash("success", "Food log updated.");
        res.redirect("/user/food-log");
    } catch (error) {
        console.error("Error updating the food log:", error);
        req.flash("error", "There was an error updating the food log. Please try again.");
        res.redirect("/user/food-log");
    }
});

// Delete food log
router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        req.flash("success", "Food log deleted!");
        res.redirect("/user/food-log");
    } catch (error) {
        console.error("Error deleting the food log:", error);
        req.flash("error", "There was an error deleting the food log. Please try again.");
        res.redirect("/user/food-log");
    }
});

// Export router
module.exports = router;
