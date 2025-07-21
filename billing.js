document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const billingForm = document.getElementById('billing-form');
    const detectLocationBtn = document.getElementById('detect-location-btn');
    const locationStatus = document.getElementById('location-status');

    const fullNameInput = document.getElementById('full-name');
    const phoneNumberInput = document.getElementById('phone-number');
    const houseNoInput = document.getElementById('house-no');
    const roadAreaInput = document.getElementById('road-area');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const pincodeInput = document.getElementById('pincode');

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

    // --- Load saved billing details if any ---
    const savedBillingDetails = JSON.parse(localStorage.getItem('billingDetails'));
    if (savedBillingDetails) {
        fullNameInput.value = savedBillingDetails.fullName || '';
        phoneNumberInput.value = savedBillingDetails.phoneNumber || '';
        houseNoInput.value = savedBillingDetails.houseNo || '';
        roadAreaInput.value = savedBillingDetails.roadArea || '';
        cityInput.value = savedBillingDetails.city || '';
        stateInput.value = savedBillingDetails.state || '';
        pincodeInput.value = savedBillingDetails.pincode || '';
    }

    // --- Auto-detect Current Location ---
    detectLocationBtn.addEventListener('click', () => {
        locationStatus.textContent = 'Detecting location...';
        locationStatus.style.color = '#007bff';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    locationStatus.textContent = 'Location detected. Getting address...';

                    // Reverse geocoding using OpenStreetMap Nominatim API
                    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

                    try {
                        const response = await fetch(nominatimUrl);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const data = await response.json();

                        if (data && data.address) {
                            const address = data.address;
                            // Populate form fields based on Nominatim response structure
                            fullNameInput.value = fullNameInput.value || ''; // Keep existing name if typed
                            phoneNumberInput.value = phoneNumberInput.value || ''; // Keep existing phone if typed
                            houseNoInput.value = address.house_number || address.building || address.flat_number || '';
                            roadAreaInput.value = address.road || address.neighbourhood || address.suburb || address.village || '';
                            cityInput.value = address.city || address.town || address.village || address.county || '';
                            stateInput.value = address.state || '';
                            pincodeInput.value = address.postcode || '';

                            locationStatus.textContent = 'Address auto-filled successfully!';
                            locationStatus.style.color = '#28a745';
                        } else {
                            locationStatus.textContent = 'Could not find address details for this location.';
                            locationStatus.style.color = '#dc3545';
                        }
                    } catch (error) {
                        console.error('Error fetching address:', error);
                        locationStatus.textContent = 'Error getting address. Please enter manually.';
                        locationStatus.style.color = '#dc3545';
                    }
                },
                (error) => {
                    let errorMessage = 'Error detecting location: ';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage += 'User denied the request for Geolocation.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage += 'Location information is unavailable.';
                            break;
                        case error.TIMEOUT:
                            errorMessage += 'The request to get user location timed out.';
                            break;
                        case error.UNKNOWN_ERROR:
                            errorMessage += 'An unknown error occurred.';
                            break;
                    }
                    locationStatus.textContent = errorMessage;
                    locationStatus.style.color = '#dc3545';
                    console.error('Geolocation error:', error);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            locationStatus.textContent = 'Geolocation is not supported by your browser.';
            locationStatus.style.color = '#dc3545';
        }
    });

    // --- Form Submission ---
    billingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const billingDetails = {
            fullName: fullNameInput.value,
            phoneNumber: phoneNumberInput.value,
            houseNo: houseNoInput.value,
            roadArea: roadAreaInput.value,
            city: cityInput.value,
            state: stateInput.value,
            pincode: pincodeInput.value
        };

        // Save billing details to localStorage
        localStorage.setItem('billingDetails', JSON.stringify(billingDetails));

        // Redirect to payment page
        window.location.href = 'payment.html';
    });
});