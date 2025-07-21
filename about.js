document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

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
        // Close menu if clicked outside overlay AND not on hamburger button
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
});