const userEmail = "buvana@gmail.com";
let allFoods = [];

fetch("/foods")
    .then(response => response.json())
    .then(data => {

        allFoods = data;

        displayFoods(data);
    });

function displayFoods(foods) {

    const container =
        document.getElementById("foodContainer");

    container.innerHTML = "";

    foods.forEach(food => {

        container.innerHTML += `
        
        <div class="food-card">

            <img
                src="image/${food.image}"
                alt="${food.name}"
            >

            <div class="food-content">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <p class="price">
                    ₹${food.price}
                </p>

                <button 
                    class="add-btn"
                    onclick="addToCart('${food.name}', ${food.price})"
                >
                     Add To Cart
                </button>

            </div>

        </div>
        `;
    });
}
const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const searchText =
        searchInput.value.toLowerCase();

    const filteredFoods =
        allFoods.filter(food =>
            food.name.toLowerCase()
            .includes(searchText)
        );

    displayFoods(filteredFoods);

});
async function addToCart(foodName, price) {

    const response = await fetch("/cart/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            userEmail,

            foodName,

            price,

            quantity: 1

        })

    });

    const data = await response.json();

    alert(data.message);
}