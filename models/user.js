const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9-_]+$/.test(v);
                },
                message: (props) =>
                    `${props.value} is not a valid username! Only letters, numbers, dashes, and underscores are allowed.`,
            },
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
            required: [true, "Email address is required"],
        },
        password: { type: String, required: true },
        phoneNumber: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
            required: [true, "Your phone number is required"],
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    console.log("------- PASSWORD -------", this.password); // might delete later...
    let hash = bcrypt.hashSync(this.password, 12);
    console.log("------- HASH -------", hash); // might delete later...
    this.password = hash;
    next();
});

// create the model and export it
const User = mongoose.model("User", userSchema);

// make this model avaliable for the index file
module.exports = User;
