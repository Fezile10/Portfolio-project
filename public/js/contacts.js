// contacts.js

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
	const backToDashboard = document.getElementById('backToDashboard');
	
	
// Handle logout button click
    logoutButton.addEventListener('click', () => {
        console.log('User  logged out');
        window.location.href = '/views/index.html'; 
    });
	// Handle gallery button click
    backToDashboard.addEventListener('click', () => {
        console.log('back to dashboad');
        window.location.href = '/views/admin_dashboard.html'; 
    });
	// Handle gallery button click
    completeProjects.addEventListener('click', () => {
        console.log('back to dashboad');
        window.location.href = '/views/gallery.html'; 
    });
	// Handle legal button click
    policy.addEventListener('click', () => {
        console.log('back to dashboad');
        window.location.href = '/views/legal.html'; 
    });
	// Handle about button click
    about.addEventListener('click', () => {
        console.log('About directs');
        window.location.href = '/views/about.html'; 
    });
});