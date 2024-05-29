const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        meals: [
            {
                name: { type: String, required: true },
                calories: { type: Number, required: true },
                protein: { type: Number },
                carbs: { type: Number },
                fats: { type: Number },
                dateConsumed: { type: Date, required: true }
            },
        ],
    },
    { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
