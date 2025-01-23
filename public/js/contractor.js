// button routing js
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
	const contacts = document.getElementById('contacts');
	const completeProjects = document.getElementById('completeProjects');
	const backToDashboard = document.getElementById('backToDashboard');
	
	
// Handle logout button click
    logoutButton.addEventListener('click', () => {
        console.log('User  logged out');
        window.location.href = '/views/index.html'; // Example redirect
    });
	// Handle admin dashbaord button click
    backToDashboard.addEventListener('click', () => {
        console.log('Dashboard redirects');
        window.location.href = '/views/contractor_dashboard.html'; // Example redirect
    });
	// Handle contacts button click
    contacts.addEventListener('click', () => {
        console.log('Contacts redirects');
        window.location.href = '/views/contacts.html'; // Example redirect
    });
	// Handle gallery button click
    completeProjects.addEventListener('click', () => {
        console.log('Gallery redirect');
        window.location.href = '/views/gallery.html'; // Example redirect
    });
});


