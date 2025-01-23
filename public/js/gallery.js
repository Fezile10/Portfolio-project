// gallery.js

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
	const backToDashboard = document.getElementById('backToDashboard');
	
	
// Handle logout button click
    logoutButton.addEventListener('click', () => {
        console.log('User  logged out');
        window.location.href = '/views/index.html'; // Example redirect
    });
	// Handle admin dashbaord button click
    backToDashboard.addEventListener('click', () => {
        console.log('Gallery redirects');
        window.location.href = '/views/admin_dashboard.html'; // Example redirect
    });
	// Handle contacts button click
    contacts.addEventListener('click', () => {
        console.log('Contacts redirects');
        window.location.href = '/views/contacts.html'; // Example redirect
    });
	// Handle legal button click
    policy.addEventListener('click', () => {
        console.log('Legal redirects');
        window.location.href = '/views/legal.html'; // Example redirect
    });
	// Handle legal button click
    about.addEventListener('click', () => {
        console.log('About redirects');
        window.location.href = '/views/about.html'; // Example redirect
    });
});