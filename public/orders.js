const userEmail = "buvana@gmail.com";

fetch(`/orders/${userEmail}`)
    .then(response => response.json())
    .then(data => {

        const container =
            document.getElementById("ordersContainer");

        data.forEach(order => {

            container.innerHTML += `
            
            <div class="cart-card">

                <h3>Order Status:
                    ${order.orderStatus || "Placed"}
                </h3>

                <p>
                    Total Amount:
                    ₹${order.totalAmount || 0}
                </p>

                <p>
                    Date:
                    ${new Date(order.orderDate).toLocaleString()}
                </p>

            </div>
            `;
        });
    });