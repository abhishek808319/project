document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const cartItemsDisplay = document.getElementById('cart-items-display');
    const totalBillAmountSpan = document.getElementById('total-bill-amount');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    // --- Theme Toggle (copied from ecommerce.js for consistency) ---
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme + '-theme');
        if (savedTheme === 'dark') {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    // --- Cart Management ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        cartItemsDisplay.innerHTML = ''; // Clear existing items
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            totalBillAmountSpan.textContent = '0.00';
            placeOrderBtn.disabled = true; // Disable order button if cart is empty
            return;
        } else {
            emptyCartMessage.style.display = 'none';
            placeOrderBtn.disabled = false;
        }

        let totalBill = 0;

        cart.forEach(item => {
            const itemTotal = item.price * (item.quantity || 1);
            totalBill += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button class="quantity-minus" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity || 1}" min="1" data-id="${item.id}" class="quantity-input">
                    <button class="quantity-plus" data-id="${item.id}">+</button>
                </div>
                <span class="item-price">$${itemTotal.toFixed(2)}</span>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsDisplay.appendChild(cartItemDiv);
        });

        totalBillAmountSpan.textContent = totalBill.toFixed(2);

        // Add event listeners for quantity and remove buttons
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                removeFromCart(productId);
            });
        });

        document.querySelectorAll('.quantity-minus').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                updateQuantity(productId, -1);
            });
        });

        document.querySelectorAll('.quantity-plus').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                updateQuantity(productId, 1);
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const newQuantity = parseInt(e.target.value);
                if (!isNaN(newQuantity) && newQuantity >= 1) {
                    updateQuantity(productId, 0, newQuantity); // 0 indicates direct set
                } else {
                    e.target.value = cart.find(item => item.id === productId).quantity; // Revert to current if invalid
                }
            });
        });
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    function updateQuantity(productId, change, newQuantity = null) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (newQuantity !== null) {
                cart[itemIndex].quantity = newQuantity;
            } else {
                cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + change;
            }

            if (cart[itemIndex].quantity <= 0) {
                removeFromCart(productId); // Remove if quantity drops to 0 or less
            } else {
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
            }
        }
    }


    // --- Place Order ---
    placeOrderBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Instead of alerting, redirect to billing page
            window.location.href = 'billing.html';
        } else {
            alert('Your cart is empty. Please add items before placing an order.');
        }
    });

    // Initial render of cart items
    renderCartItems();
});