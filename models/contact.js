const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Name is required"] },
        email: {
            type: String,
            required: [true, "Email address is required"],
        },
        message: { type: String, required: [true, "Message is required"] },
        dateSubmitted: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
