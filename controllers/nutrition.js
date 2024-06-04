const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/search", async (req, res) => {
    const foodItem = req.body.foodName;
    try {
        const response = await axios.get(
            `https://api.api-ninjas.com/v1/nutrition?query=${foodItem}`,
            {
                headers: {
                    "X-Api-Key": process.env.API_NINJAS_KEY,
                },
            }
        );
        
        if (response.data && response.data.length > 0) {
            const nutrients = response.data[0];
            res.json({
                calories: nutrients.calories,
                protein: nutrients.protein_g,
                carbs: nutrients.carbohydrates_total_g,
                fats: nutrients.fat_total_g,
            });
        } else {
            res.status(404).json({ error: "No nutritional data found." });
        }
    } catch (error) {
        console.error("Error getting nutritional data:", error.message);
        res.status(500).json({ error: "Could not get nutritional data." });
    }
});

module.exports = router;
