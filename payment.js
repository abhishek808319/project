document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    const upiDetailsDiv = document.getElementById('upi-details');
    const cardDetailsDiv = document.getElementById('card-details');
    const placeOrderFinalBtn = document.getElementById('place-order-final-btn');
    const orderSuccessModal = document.getElementById('order-success-modal');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const summaryItemCount = document.getElementById('summary-item-count');
    const summaryTotalAmount = document.getElementById('summary-total-amount');

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    const desktopLogoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

    // --- Hamburger Menu Toggle ---
    hamburgerMenu.addEventListener('click', () => {
        mobileNavOverlay.classList.add('active');
        body.classList.add('mobile-menu-open');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        body.classList.remove('mobile-menu-open');
    });

    document.addEventListener('click', (event) => {
        if (!mobileNavOverlay.contains(event.target) && !hamburgerMenu.contains(event.target) && mobileNavOverlay.classList.contains('active')) {
            mobileNavOverlay.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        }
    });

    // --- Theme Toggle (copied for consistency) ---
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

    // --- Logout Functionality ---
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('cart');
        localStorage.removeItem('billingDetails');
        window.location.href = 'index.html';
    };

    if (desktopLogoutBtn) {
        desktopLogoutBtn.addEventListener('click', handleLogout);
    }
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }

    // --- Display Order Summary ---
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;
    let totalAmount = 0;

    cart.forEach(item => {
        totalItems += (item.quantity || 1);
        totalAmount += item.price * (item.quantity || 1);
    });

    summaryItemCount.textContent = totalItems;
    summaryTotalAmount.textContent = totalAmount.toFixed(2);

    // --- Handle Payment Method Selection ---
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            upiDetailsDiv.classList.add('hidden');
            cardDetailsDiv.classList.add('hidden');

            if (radio.value === 'upi') {
                upiDetailsDiv.classList.remove('hidden');
            } else if (radio.value === 'card') {
                cardDetailsDiv.classList.remove('hidden');
            }
        });
    });

    // Initialize with default selected radio (COD)
    if (document.getElementById('cod').checked) {
        upiDetailsDiv.classList.add('hidden');
        cardDetailsDiv.classList.add('hidden');
    }


    // --- Place Order Button Logic ---
    placeOrderFinalBtn.addEventListener('click', () => {
        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        let isValid = true;
        let message = '';

        // Basic validation based on selected method
        if (selectedPaymentMethod === 'upi') {
            const upiId = document.getElementById('upi-id-input').value.trim();
            if (!upiId) {
                isValid = false;
                message = 'Please enter your UPI ID.';
            } else if (!upiId.includes('@') || upiId.length < 5) { // Simple check
                isValid = false;
                message = 'Please enter a valid UPI ID.';
            }
        } else if (selectedPaymentMethod === 'card') {
            const cardNumber = document.getElementById('card-number').value.trim();
            const cardExpiry = document.getElementById('card-expiry').value.trim();
            const cardCvv = document.getElementById('card-cvv').value.trim();

            if (!cardNumber || !cardExpiry || !cardCvv) {
                isValid = false;
                message = 'Please fill in all card details.';
            } else if (cardNumber.length < 16 || isNaN(cardNumber.replace(/\s/g, ''))) {
                isValid = false;
                message = 'Please enter a valid card number.';
            } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) { // MM/YY format
                isValid = false;
                message = 'Please enter expiry in MM/YY format.';
            } else if (cardCvv.length < 3 || isNaN(cardCvv)) {
                isValid = false;
                message = 'Please enter a valid CVV.';
            }
        }

        if (isValid) {
            // --- START: Save Order to localStorage ---
            const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            const billingDetails = JSON.parse(localStorage.getItem('billingDetails')) || {};

            if (currentCart.length > 0) {
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                const newOrder = {
                    orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Unique ID
                    date: new Date().toLocaleString(),
                    items: currentCart,
                    totalAmount: totalAmount.toFixed(2),
                    billingDetails: billingDetails,
                    paymentMethod: selectedPaymentMethod,
                    status: 'Pending' // Initial status
                };
                orders.push(newOrder);
                localStorage.setItem('orders', JSON.stringify(orders));
            }
            // --- END: Save Order to localStorage ---

            localStorage.removeItem('cart'); // Clear cart from local storage
            localStorage.removeItem('billingDetails'); // Clear billing details

            // Show success notification
            orderSuccessModal.classList.add('visible');

            // Optionally, redirect after a few seconds
            setTimeout(() => {
                orderSuccessModal.classList.remove('visible');
                window.location.href = 'ecommerce.html'; // Redirect to home page
            }, 3000); // Redirect after 3 seconds
        } else {
            // Using a custom "toast" notification would be better than alert
            alert(message);
        }
    });

    // --- Continue Shopping Button in Modal ---
    continueShoppingBtn.addEventListener('click', () => {
        orderSuccessModal.classList.remove('visible');
        window.location.href = 'ecommerce.html';
    });
});