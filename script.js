// Selectors
const cartItems = document.querySelector("#cart-items tbody");
const totalPriceElement = document.querySelector("#total-price");
const confirmOrderButton = document.querySelector("#confirm-order");
let cart = [];

// Function to add item to cart
function addToCart(product) {
    const productId = product.dataset.id;
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.dataset.name,
            price: parseFloat(product.dataset.price),
            quantity: 1
        });
    }

    renderCart();
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Function to increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        renderCart();
    }
}

// Function to decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
        }
        renderCart();
    }
}

// Function to update the cart UI
function renderCart() {
    // Clear existing cart items
    cartItems.innerHTML = '';

    // Add each item to the cart table
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                ${item.quantity}
                <button class="increase-quantity" data-id="${item.id}">+</button>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-from-cart" data-id="${item.id}">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    // Update total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

     // Show "Confirm Order" button if there are items in the cart
     if (cart.length > 0) {
        confirmOrderButton.style.display = "inline-block";
    } else {
        confirmOrderButton.style.display = "none";
    }

    // Add event listeners for remove, increase, and decrease buttons
    const removeButtons = document.querySelectorAll(".remove-from-cart");
    const increaseButtons = document.querySelectorAll(".increase-quantity");
    const decreaseButtons = document.querySelectorAll(".decrease-quantity");

    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = button.dataset.id;
            removeFromCart(productId);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = button.dataset.id;
            increaseQuantity(productId);
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = button.dataset.id;
            decreaseQuantity(productId);
        });
    });
}


// Handle confirm order button click
confirmOrderButton.addEventListener('click', function () {
    // Store cart data in localStorage so we can access it on the invoice page
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to invoice page
    window.location.href = "invoice.html";
});


// Add event listeners for "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const product = button.closest(".product");
        addToCart(product);
    });
});

document.getElementById('confirm-order').addEventListener('click', async function () {
    const userId = localStorage.getItem('userId'); // Get the logged-in user's ID
    const products = []; // Collect product details from the cart
    const total = 100; // Replace with actual total price calculation

    const response = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, products, total })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Order placed successfully');
        window.location.href = 'invoice.html'; // Redirect to invoice page
    } else {
        alert('Error placing order');
    }
});

