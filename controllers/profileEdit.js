const express = require("express");
const router = express.Router();
const { User } = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/edit", isLoggedIn, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        res.render("profile/edit", { currentUser });
    } catch (error) {
        console.error("Error rendering edit profile page:", error);
        req.flash("error", "Unable to load the edit profile page. Please try again.");
        res.redirect("/user/profile");
    }
});

// update profile
router.post("/edit", isLoggedIn, async (req, res) => {
    try {
        const { name, username, email, phoneNumber, birthDate, age, weight, height } = req.body;
        await User.findByIdAndUpdate(req.user._id, {
            name,
            username,
            email,
            phoneNumber,
            birthDate,
            age,
            weight,
            height: {
                feet: height.feet,
                inches: height.inches,
            },
        });
        req.flash("success", "Profile updated successfully!");
        res.redirect("/user/profile");
    } catch (error) {
        console.error("Error updating profile:", error);
        req.flash("error", "Unable to update profile. Please try again.");
        res.redirect("/user/profile/edit");
    }
});

module.exports = router;
