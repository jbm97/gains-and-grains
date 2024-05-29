const express = require("express");
const router = express.Router();

const { Contact } = require("../models");

router.post("/submit", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Contact({
            name,
            email,
            message,
        });
        await newMessage.save();
        req.flash("success", "Your message has been sent successfully!");
        res.redirect("/");
    } catch (error) {
        console.error("Error saving contact message:", error);
        req.flash("error", "There was an error sending your message. Please try again.");
        res.redirect("/contact");
    }
});

module.exports = router;
