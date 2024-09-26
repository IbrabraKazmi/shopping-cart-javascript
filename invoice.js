// Selectors for the invoice
const invoiceItems = document.querySelector("#invoice-items tbody");
const invoiceTotalPriceElement = document.querySelector("#invoice-total-price");

// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart'));

// Function to render the invoice
function renderInvoice() {
    // Clear existing invoice items
    invoiceItems.innerHTML = '';

    // Add each item from the cart to the invoice table
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        invoiceItems.appendChild(row);
    });

    // Calculate and display total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    invoiceTotalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Render the invoice on page load
renderInvoice();
