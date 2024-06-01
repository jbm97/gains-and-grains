const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        date: { type: Date, required: true },
        exercises: [
            {
                name: { type: String, required: true },
                sets: { type: Number },
                reps: { type: Number },
                weight: { type: Number },
                duration: { type: Number },
            },
        ],
    },
    { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
