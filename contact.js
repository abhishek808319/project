document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

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

    // --- Contact Form Submission ---
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic client-side validation
        if (!name || !email || !subject || !message) {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.style.color = '#dc3545'; // Red for error
            return;
        }

        // Simple email format validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formStatus.textContent = 'Please enter a valid email address.';
            formStatus.style.color = '#dc3545';
            return;
        }

        // In a real application, you would send this data to a backend server.
        // Example using fetch API (requires a backend endpoint):
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, subject, message }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formStatus.textContent = 'Message sent successfully! We will get back to you soon.';
                formStatus.style.color = '#28a745'; // Green for success
                contactForm.reset(); // Clear form fields
            } else {
                formStatus.textContent = 'Failed to send message. Please try again later.';
                formStatus.style.color = '#dc3545';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            formStatus.textContent = 'An error occurred. Please try again.';
            formStatus.style.color = '#dc3545';
        });
        */

        // For this client-side demo, we'll just show a success message
        formStatus.textContent = 'Message sent successfully!';
        formStatus.style.color = '#28a745'; // Green for success
        contactForm.reset(); // Clear form fields

        // Optional: clear status message after a few seconds
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });
});