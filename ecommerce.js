document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const cartItemCountSpan = document.getElementById('cart-item-count');
    const productGrid = document.getElementById('product-grid');
    const productSearchInput = document.getElementById('product-search');

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay'); // New: Mobile menu overlay
    const closeMenuBtn = document.getElementById('close-menu-btn'); // New: Close button for mobile menu

    const desktopLogoutBtn = document.getElementById('logout-btn'); // Desktop logout button
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn'); // Mobile logout button


    // --- Hamburger Menu Toggle ---
    hamburgerMenu.addEventListener('click', () => {
        mobileNavOverlay.classList.add('active');
        body.classList.add('mobile-menu-open'); // Prevent body scroll
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        body.classList.remove('mobile-menu-open'); // Re-enable body scroll
    });

    // Close menu if clicked outside (for mobile overlay)
    document.addEventListener('click', (event) => {
        // Check if click is outside the overlay AND not on the hamburger button
        if (!mobileNavOverlay.contains(event.target) && !hamburgerMenu.contains(event.target) && mobileNavOverlay.classList.contains('active')) {
            mobileNavOverlay.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        }
    });

    // --- Theme Toggle ---
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        // Save theme preference to localStorage
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
    });

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme + '-theme');
        if (savedTheme === 'dark') {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    // --- Logout Functionality ---
    const handleLogout = (e) => {
        e.preventDefault(); // Prevent default link behavior
        localStorage.removeItem('isLoggedIn'); // Clear login status
        // Optional: Clear cart or other session data if necessary
        localStorage.removeItem('cart');
        localStorage.removeItem('billingDetails');
        window.location.href = 'index.html'; // Redirect to login page
    };

    if (desktopLogoutBtn) { // Ensure button exists before adding listener
        desktopLogoutBtn.addEventListener('click', handleLogout);
    }
    if (mobileLogoutBtn) { // Ensure button exists before adding listener
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }


    // --- Product Data (Example - you'd fetch this from a backend in a real app) ---
    const products = [
        { id: 1, name: 'Wireless Headphones', price: 599.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTds9ptfD9wNifFd4m2tvWiZQ90fTmsVyc33A&s' },
        { id: 2, name: 'Smartwatch X1', price: 1299.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZYazY7_GpP4OqND-_d3LEkbucthdcCWHbg&s' },
        { id: 3, name: 'Portable Bluetooth Speaker', price: 3499.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqoWAKnHfC0taBaJDeESTfkiPrug-iKJJjA&s' },
        { id: 4, name: '4K Ultra HD Monitor', price: 7999.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqka9fESb95oULTpzQNWu23UODLelJok9Z9g&s' },
        { id: 5, name: 'Ergonomic Office Chair', price: 9999.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTssZHs6yqqCwMdGfaA2FNSn9R7pxBwGxBstA&s' },
        { id: 6, name: 'Gaming Keyboard RGB', price: 750.00, image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvvpCBK-s7lnJzIuwdnpsjtmaYqWNip4rJCw&s' },
        { id: 7, name: 'High-Speed USB Drive 128GB', price: 299.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJuieyUTGNGQw4IXnLJxi69h9bqol9v9Zs7w&s' },
        { id: 8, name: 'Noise-Cancelling Earbuds', price: 889.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzd_r0BrK53Bs9a99rEZEEZzh0ldR9-wS-_Q&s' },
        { id: 9, name: 'External Hard Drive 1TB', price: 1999.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPF_wye_cOotyPSfP1Pv_5VFcxbK318MgdeQ&s' },
        { id: 10, name: 'HD Webcam with Mic', price: 459.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR69qwVMwYrnIgB1TvpRoPKlWLKCFiZr1vZjw&s' },
        { id: 11, name: 'Laptop Stand', price: 499.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0gEyFiBNU-lnIdZt1BNlxGFBdxPSnAhSovA&s' },
        { id: 12, name: 'Wireless Mouse', price: 299.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzO9CipEpr0ged7Ow9vKr4hAriIN8GeDjNw&s' },
        { id: 13, name: 'Gaming Mouse Pad', price: 220.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmesg1eYs012CfLcSZMSrgtfdX-JD_QHJeA&s' },
        { id: 14, name: 'USB-C Hub', price: 199.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTAQ3wkTXZ1lpJwYMnmYWqM455yRhZPROMeg&s' },
        { id: 15, name: 'Portable Power Bank', price: 899.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2_RP67WgriN1Xq4hw2XZWTq6h1RMngMJBjQ&s' },
        { id: 16, name: 'Smartphone Tripod', price: 1499.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYBLOE5HdFXQRG3MOPTVoZh7zH52bPNkI5w&s' },
        { id: 17, name: 'Smart Light Bulb', price: 550.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTGxvIssR5Iy3r3R2O7s7cOPTarJIH7DKapw&s' },
        { id: 18, name: 'Home Security Camera', price: 850.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq--hkew14Cpr27sMvAE9eD5w0qqUo4JswBA&s' },
        { id: 19, name: 'Robot Vacuum Cleaner', price: 25000.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbxCmSuBQBwSrIs3Sg3kxliWpwgrkm4LpVgQ&s' },
        { id: 20, name: 'Espresso Machine', price: 15000.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUHxga7igpwiP5HC7BCJOQvBbnl-Esa54WuQ&s' },
        { id: 21, name: 'Air Fryer', price: 9900.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj5W3l3Y1xjeMoi8-_PNa4nolFsLaxuNK_g&s' },
        { id: 22, name: 'Blender High Speed', price: 4999.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWUMsNlz3iL1g2UCRnhhTk6RQ9-OnKpFwArg&s' },
        { id: 23, name: 'Digital Kitchen Scale', price: 2999.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtBvHBntNU0s9BuxO_kyNdFnd0U0Oc2ImcBA&s' },
        { id: 24, name: 'Electric Kettle', price: 1999.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN4GgrqQ6LXQkaxDmunsGqKdOGchwIV4NA7g&s' },
        { id: 25, name: 'Toaster Oven', price: 4500.00, image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqdXpLhlHQ4HdBf2du9Do6kgpC3gDmh63s1Q&s' },
        { id: 26, name: 'Coffee Grinder', price: 2899.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8uZdxTkU0gXniYF-AptZXvN-pZaivohSLFw&s' },
        { id: 27, name: 'Hand Mixer', price: 1499.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQQzJN7EcY76MBZG2sul5zjvHtsqDUyc-2w&s' },
        { id: 28, name: 'Waffle Maker', price: 3599.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwq921hdknZOYRLvHJqA1MYK3d3mT0k_qeew&s' },
        { id: 29, name: 'Food Processor', price: 1899.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWH0ekXB1IKdT-Lo8IlhUxuH1-I5Wm_moyMg&s' },
        { id: 30, name: 'Juicer', price: 800.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BsJ1WBwQxPojkCRwSCzgOY21mz_b8rdb5Q&s' },
        { id: 31, name: 'Dumbbell Set 20kg', price: 699.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgU0rPpIbHZZdWnp1Iq6OUWETwT0TjNi2X9A&s' },
        { id: 32, name: 'Yoga Mat', price: 250.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLoAUiEtpB0f1ebBM_gDsNO6-7p3oEMq-F0A&s' },
        { id: 33, name: 'Resistance Bands Set', price: 199.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08wJ1UQlsRv7trQ8chYIU8xYMLvGh1XGevA&s' },
        { id: 34, name: 'Fitness Tracker', price: 1799.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3jbfciVExAQ_fZa0vy9P0K118PdxHdfHcg&s' },
        { id: 35, name: 'Jump Rope', price: 299.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc1-4YOD298vvln7rwF4IdCvKq0-zm4P-acw&s' },
        { id: 36, name: 'Water Bottle Stainless Steel', price: 180.00, image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvRU_nE4Y6pmA6QXNwFYgDLMLKaNmNf0NBnA&s' },
        { id: 37, name: 'Smart Scale', price: 899.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA8U4m1cV8wpqr8-gSKiEl_DivZ3lst3YftQ&s' },
        { id: 38, name: 'Adjustable Kettlebell', price: 900.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWnhY947I7jdJu6GbsMIXokpO_FewRFvpzw&s' },
        { id: 39, name: 'Exercise Bike', price: 24999.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNMFcFjp4N-gkDUEIz4-lo-mcxKqUAc-eeAw&s' },
        { id: 40, name: 'Treadmill Compact', price: 18999.00, image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gnpc8VfvB9vG4CqsVR_7txmHzaprEEDs2A&s' },
        { id: 41, name: 'Art Sketchbook Set', price: 799.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIvLpoxYWLUllOblgw8bX1srb_ahjL9wk7w&s' },
        { id: 42, name: 'Acrylic Paint Set', price: 499.00, image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBhFX7TNSEcOgynw3ZKdFUgcoFSTIkqAHcKg&s' },
        { id: 43, name: 'Brush Pen Set', price: 179.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Sb7XtR-HDZ-nQQxJzshCPR2rqqrornhxxg&s' },
        { id: 44, name: 'Easel Portable', price: 499.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTtZVBbJ7sUSiY_hYfSR0lkp9AeHMSKi6xtA&s' },
        { id: 45, name: 'Canvas Pack 5-Piece', price: 399.00, image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsF8uIkwTL5mUGV6KsCCv1UAa7ZEaC2zY2dQ&s' },
        { id: 46, name: 'Calligraphy Set', price: 350.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FQ4nXJZr-nUOBCx9Mj_lKIpRgMH4-IGjbw&s' },
        { id: 47, name: 'Drawing Pencils Set', price: 180.00, image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0UUaJXoI8qQRGsKX8A5oQCOUZCb3NJ70YQ&s' },
        { id: 48, name: 'Watercolor Set', price: 449.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9aSQAqbbpA89P11RzeCMc9tCzjbkYFwI09w&s' },
        { id: 49, name: 'Sculpting Clay Kit', price: 750.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPBDUrGhR4lCo5voQ-dkv4HrzlBXplXm9Uw&s' },
        { id: 50, name: 'Craft Paper Assortment', price: 145.00, image: '	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSqK5o0pUj5P-qyWXlHekTwzt7Kl5sDa20A&s' }
    ];


    // --- Render Products ---
    function renderProducts(filteredProducts = products) {
        productGrid.innerHTML = ''; // Clear existing products
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p style="text-align: center; width: 100%;">No products found matching your search.</p>';
            return;
        }
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">Rs ${product.price.toFixed(2)}</p>
                <button data-product-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });

        // Add event listeners to new "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                addToCart(productId);
            });
        });
    }

    // --- Cart Management ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartItemCountSpan.textContent = cart.length;
    }

    function addToCart(productId) {
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            // Check if item is already in cart, if so, just increment quantity or add new entry
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1; // Initialize quantity if not present
            } else {
                cart.push({ ...productToAdd, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            // Using a custom "toast" notification would be better than alert
            // alert(`${productToAdd.name} added to cart!`);
        }
    }

    // --- Search Functionality ---
    productSearchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    // Initial render and cart count update
    renderProducts();
    updateCartCount();
});