const express = require("express");
const router = express.Router();
const passport = require("../config/passport-config");

// import User model
const { User } = require("../models");

// signup
router.get("/signup", (req, res) => {
    res.render("auth/signup", {});
});

// login
router.get("/login", (req, res) => {
    res.render("auth/login", {});
});

// logout
router.get("/logout", (req, res) => {
    res.locals.currentUser = null;
    req.logOut((error) => {
        if (error) {
            req.flash("error", "Error logging out. Please try again");
            return res.redirect("/");
        }
        req.flash("success", "Logging out... See you next time!");
        res.redirect("/");
    });
});

// ======== POST ROUTES ===============
router.post("/signup", async (req, res) => {
    try {
        const findUser = await User.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }],
        });
        if (!findUser) {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
            });
            await newUser.save();
            passport.authenticate("local", {
                successRedirect: "/login",
                successFlash: `Welcome ${newUser.name}! Account created, please login`,
            })(req, res);
        } else {
            req.flash("error", "Email or username already exists. Please try again.");
            res.redirect("/signup");
        }
    } catch (error) {
        if (error.errors) {
            for (let key in error.errors) {
                req.flash("error", error.errors[key].message);
            }
        } else if (error.code === 11000) {
            req.flash("error", "Email or username already exists. Please try again.");
        } else {
            req.flash("error", "There was an error creating your account. Please try again.");
        }
        res.redirect("/signup");
    }
});

// post to login
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/user/dashboard",
        failureRedirect: "/login",
        successFlash: "Welcome Back to Gains & Grains!",
        failureFlash: "Username or password is incorrect. Please try again",
    })
);

module.exports = router;
