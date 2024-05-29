const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        description: { type: String },
        targetDate: { type: Date, required: true },
        achieved: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
