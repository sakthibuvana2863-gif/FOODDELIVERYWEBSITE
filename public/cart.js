const userEmail = "buvana@gmail.com";

fetch(`/cart/${userEmail}`)
    .then(response => response.json())
    .then(data => {

        const container =
            document.getElementById("cartContainer");

        let total = 0;

        data.forEach(item => {

            total += item.price * item.quantity;

            container.innerHTML += `
            
            <div class="cart-card">

                <h3>${item.foodName}</h3>

                <p>Price: ₹${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

            </div>
            `;
        });

        document.getElementById("totalAmount")
            .innerText = `Total: ₹${total}`;
    });

document
.getElementById("placeOrderBtn")
.addEventListener("click", async () => {

    const response =
        await fetch("/orders/place-order", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                userEmail
            })
        });

    const data = await response.json();

    alert(data.message);

    location.reload();
});