const express = require("express");
const router = express.Router();

const Contact = require("../models/contact");

router.post("/submit", async (req, res) => {
    try {
        const newMessage = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
        await newMessage.save();
        req.flash("success", "Your message has been sent.");
        res.redirect("/");
    } catch (error) {
        console.error("Error saving contact message:", error);
        req.flash("error", "There was an error sending your message. Please try again.");
        res.redirect("/contact");
    }
});

module.exports = router;
