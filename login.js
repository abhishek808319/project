document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const currentTimeSpan = document.getElementById('current-time');

    // Function to update current time
    function updateTime() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        currentTimeSpan.textContent = now.toLocaleTimeString('en-US', options);
    }

    // Initial time update and set interval
    updateTime();
    setInterval(updateTime, 1000);

    // Toggle between login and registration forms
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    // Handle form submissions (basic example - no actual backend logic here)
    loginForm.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const emailPhone = document.getElementById('login-email-phone').value;
        const password = document.getElementById('login-password').value;

        if (emailPhone && password) {
            // alert('Login attempted! (Functionality to be added)');
            // In a real application, you'd send this to a server for authentication.
            // On successful login, redirect to the e-commerce page:
            window.location.href = 'ecommerce.html'; // Redirect to e-commerce page
        } else {
            alert('Please fill in both fields.');
        }
    });

    registerForm.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('reg-first-name').value;
        const lastName = document.getElementById('reg-last-name').value;
        const phone = document.getElementById('reg-phone').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        if (firstName && lastName && phone && email && password) {
            alert('Registration attempted! (Functionality to be added)');

            loginForm.classList.add('active'); // Switch back to login after registration attempt
            registerForm.classList.remove('active');
        } else {
            alert('Please fill in all registration fields.');
        }
    });

    // Send OTP button (client-side only for now)
    const sendOtpButton = document.getElementById('send-otp');
    sendOtpButton.addEventListener('click', () => {
        const phoneNumber = document.getElementById('reg-phone').value;
        if (phoneNumber) {
            alert(`OTP sent to ${phoneNumber}! (This is a placeholder, real OTP requires backend)`);
            // Here you'd typically enable an OTP input field and a verify OTP button
        } else {
            alert('Please enter a phone number to send OTP.');
        }
    });


});