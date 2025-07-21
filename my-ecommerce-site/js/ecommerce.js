document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const cartItemCountSpan = document.getElementById('cart-item-count');
    const productGrid = document.getElementById('product-grid');
    const productSearchInput = document.getElementById('product-search');

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

    // --- Product Data (Example - you'd fetch this from a backend in a real app) ---
    const products = [
        { id: 1, name: 'Wireless Headphones', price: 59.99, image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Headphones' },
        { id: 2, name: 'Smartwatch X1', price: 129.99, image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Smartwatch' },
        { id: 3, name: 'Portable Bluetooth Speaker', price: 34.50, image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Speaker' },
        { id: 4, name: '4K Ultra HD Monitor', price: 299.00, image: 'https://via.placeholder.com/150/FF33D1/FFFFFF?text=Monitor' },
        { id: 5, name: 'Ergonomic Office Chair', price: 180.00, image: 'https://via.placeholder.com/150/57FF33/FFFFFF?text=Chair' },
        { id: 6, name: 'Gaming Keyboard RGB', price: 75.00, image: 'https://via.placeholder.com/150/F1C40F/FFFFFF?text=Keyboard' },
        { id: 7, name: 'High-Speed USB Drive 128GB', price: 19.99, image: 'https://via.placeholder.com/150/9B59B6/FFFFFF?text=USB' },
        { id: 8, name: 'Noise-Cancelling Earbuds', price: 89.99, image: 'https://via.placeholder.com/150/1ABC9C/FFFFFF?text=Earbuds' },
        { id: 9, name: 'External Hard Drive 1TB', price: 65.00, image: 'https://via.placeholder.com/150/2ECC71/FFFFFF?text=HDD' },
        { id: 10, name: 'HD Webcam with Mic', price: 45.00, image: 'https://via.placeholder.com/150/3498DB/FFFFFF?text=Webcam' },
        { id: 11, name: 'Laptop Stand', price: 25.00, image: 'https://via.placeholder.com/150/E74C3C/FFFFFF?text=Stand' },
        { id: 12, name: 'Wireless Mouse', price: 15.00, image: 'https://via.placeholder.com/150/F39C12/FFFFFF?text=Mouse' },
        { id: 13, name: 'Gaming Mouse Pad', price: 12.00, image: 'https://via.placeholder.com/150/8E44AD/FFFFFF?text=Pad' },
        { id: 14, name: 'USB-C Hub', price: 39.00, image: 'https://via.placeholder.com/150/D35400/FFFFFF?text=Hub' },
        { id: 15, name: 'Portable Power Bank', price: 29.00, image: 'https://via.placeholder.com/150/C0392B/FFFFFF?text=Powerbank' },
        { id: 16, name: 'Smartphone Tripod', price: 18.00, image: 'https://via.placeholder.com/150/7F8C8D/FFFFFF?text=Tripod' },
        { id: 17, name: 'Smart Light Bulb', price: 14.00, image: 'https://via.placeholder.com/150/2C3E50/FFFFFF?text=Bulb' },
        { id: 18, name: 'Home Security Camera', price: 85.00, image: 'https://via.placeholder.com/150/95A5A6/FFFFFF?text=Camera' },
        { id: 19, name: 'Robot Vacuum Cleaner', price: 250.00, image: 'https://via.placeholder.com/150/ECF0F1/000000?text=Vacuum' },
        { id: 20, name: 'Espresso Machine', price: 150.00, image: 'https://via.placeholder.com/150/BDC3C7/000000?text=Coffee' },
        { id: 21, name: 'Air Fryer', price: 99.00, image: 'https://via.placeholder.com/150/E67E22/FFFFFF?text=AirFryer' },
        { id: 22, name: 'Blender High Speed', price: 70.00, image: 'https://via.placeholder.com/150/E0BBE4/FFFFFF?text=Blender' },
        { id: 23, name: 'Digital Kitchen Scale', price: 22.00, image: 'https://via.placeholder.com/150/957DAD/FFFFFF?text=Scale' },
        { id: 24, name: 'Electric Kettle', price: 30.00, image: 'https://via.placeholder.com/150/D291BC/FFFFFF?text=Kettle' },
        { id: 25, name: 'Toaster Oven', price: 45.00, image: 'https://via.placeholder.com/150/FFC72C/FFFFFF?text=Toaster' },
        { id: 26, name: 'Coffee Grinder', price: 28.00, image: 'https://via.placeholder.com/150/A3DA8D/FFFFFF?text=Grinder' },
        { id: 27, name: 'Hand Mixer', price: 35.00, image: 'https://via.placeholder.com/150/C6D8D6/000000?text=Mixer' },
        { id: 28, name: 'Waffle Maker', price: 40.00, image: 'https://via.placeholder.com/150/FBE7C6/000000?text=Waffle' },
        { id: 29, name: 'Food Processor', price: 110.00, image: 'https://via.placeholder.com/150/B6CCFE/FFFFFF?text=Processor' },
        { id: 30, name: 'Juicer', price: 80.00, image: 'https://via.placeholder.com/150/A5C8ED/FFFFFF?text=Juicer' },
        { id: 31, name: 'Dumbbell Set 20kg', price: 70.00, image: 'https://via.placeholder.com/150/DEE2FF/FFFFFF?text=Dumbbells' },
        { id: 32, name: 'Yoga Mat', price: 25.00, image: 'https://via.placeholder.com/150/B8F2E6/FFFFFF?text=YogaMat' },
        { id: 33, name: 'Resistance Bands Set', price: 19.00, image: 'https://via.placeholder.com/150/BAE1FF/FFFFFF?text=Bands' },
        { id: 34, name: 'Fitness Tracker', price: 60.00, image: 'https://via.placeholder.com/150/DCDCDC/000000?text=Tracker' },
        { id: 35, name: 'Jump Rope', price: 10.00, image: 'https://via.placeholder.com/150/FFD3B5/000000?text=Jumprope' },
        { id: 36, name: 'Water Bottle Stainless Steel', price: 18.00, image: 'https://via.placeholder.com/150/FFABAB/FFFFFF?text=Bottle' },
        { id: 37, name: 'Smart Scale', price: 55.00, image: 'https://via.placeholder.com/150/D4CBE5/FFFFFF?text=SmartScale' },
        { id: 38, name: 'Adjustable Kettlebell', price: 90.00, image: 'https://via.placeholder.com/150/C5D8B4/FFFFFF?text=Kettlebell' },
        { id: 39, name: 'Exercise Bike', price: 200.00, image: 'https://via.placeholder.com/150/FFE0B2/000000?text=Bike' },
        { id: 40, name: 'Treadmill Compact', price: 350.00, image: 'https://via.placeholder.com/150/FFCCBC/FFFFFF?text=Treadmill' },
        { id: 41, name: 'Art Sketchbook Set', price: 22.00, image: 'https://via.placeholder.com/150/A7FFEB/FFFFFF?text=Sketchbook' },
        { id: 42, name: 'Acrylic Paint Set', price: 30.00, image: 'https://via.placeholder.com/150/CCFF90/FFFFFF?text=Paints' },
        { id: 43, name: 'Brush Pen Set', price: 15.00, image: 'https://via.placeholder.com/150/FFFF8D/000000?text=Pens' },
        { id: 44, name: 'Easel Portable', price: 40.00, image: 'https://via.placeholder.com/150/FFAB40/000000?text=Easel' },
        { id: 45, name: 'Canvas Pack 5-Piece', price: 28.00, image: 'https://via.placeholder.com/150/FF5252/FFFFFF?text=Canvas' },
        { id: 46, name: 'Calligraphy Set', price: 35.00, image: 'https://via.placeholder.com/150/FF4081/FFFFFF?text=Calligraphy' },
        { id: 47, name: 'Drawing Pencils Set', price: 18.00, image: 'https://via.placeholder.com/150/E040FB/FFFFFF?text=Pencils' },
        { id: 48, name: 'Watercolor Set', price: 27.00, image: 'https://via.placeholder.com/150/7C4DFF/FFFFFF?text=Watercolor' },
        { id: 49, name: 'Sculpting Clay Kit', price: 32.00, image: 'https://via.placeholder.com/150/448AFF/FFFFFF?text=Clay' },
        { id: 50, name: 'Craft Paper Assortment', price: 12.00, image: 'https://via.placeholder.com/150/18FFFF/000000?text=Paper' }
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
                <p class="price">$${product.price.toFixed(2)}</p>
                <button data-product-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });

        // Add event listeners to new "Add to Cart" buttons
        document.querySelectorAll('.product-card button').forEach(button => {
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
            alert(`${productToAdd.name} added to cart!`);
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