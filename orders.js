document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const ordersListDiv = document.getElementById('orders-list');
    const noOrdersMessage = document.getElementById('no-orders-message');

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

    // --- Render Orders ---
    function renderOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        ordersListDiv.innerHTML = ''; // Clear existing content

        if (orders.length === 0) {
            noOrdersMessage.style.display = 'block';
            return;
        } else {
            noOrdersMessage.style.display = 'none';
        }

        // Sort orders by date, newest first
        orders.sort((a, b) => new Date(b.date) - new Date(a.date));

        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('order-card');

            // Order Header
            const orderHeader = document.createElement('div');
            orderHeader.classList.add('order-header');
            orderHeader.innerHTML = `
                <h3>Order ID: ${order.orderId}</h3>
                <span class="order-date">${order.date}</span>
            `;
            orderCard.appendChild(orderHeader);

            // Order Details (Summary)
            const orderDetails = document.createElement('div');
            orderDetails.classList.add('order-details');
            orderDetails.innerHTML = `
                <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
                <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Shipping To:</strong> ${order.billingDetails.fullName}, ${order.billingDetails.houseNo}, ${order.billingDetails.roadArea}, ${order.billingDetails.city}, ${order.billingDetails.state} - ${order.billingDetails.pincode}</p>
            `;
            orderCard.appendChild(orderDetails);

            // Order Items List
            const orderItemsList = document.createElement('ul');
            orderItemsList.classList.add('order-items-list');
            order.items.forEach(item => {
                const orderItem = document.createElement('li');
                orderItem.classList.add('order-item');
                orderItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)} each</p>
                    </div>
                `;
                orderItemsList.appendChild(orderItem);
            });
            orderCard.appendChild(orderItemsList);

            // Append the complete order card to the list
            ordersListDiv.appendChild(orderCard);
        });
    }

    // Initial render of orders when the page loads
    renderOrders();
});