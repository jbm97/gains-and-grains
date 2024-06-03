async function nutritionalData() {
    const foodName = document.getElementById("foodName").value;
    try {
        const response = await fetch("/api/nutrition/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ foodName }),
        });
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        document.getElementById("calories").value = Math.round(data.calories);
        document.getElementById("protein").value = Math.round(data.protein);
        document.getElementById("carbs").value = Math.round(data.carbs);
        document.getElementById("fats").value = Math.round(data.fats);
    } catch (error) {
        console.error("Item not found, sorry!", error.message);
        alert("Item not found, sorry!\n" + error.message);
    }
}
