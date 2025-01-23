// admin.js

document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('projectForm');
    const projectsTableBody = document.querySelector('#projectsTable tbody');
    const bidsTableBody = document.querySelector('#bidsTable tbody');
    const logoutButton = document.getElementById('logoutButton');
	const completeProjects = document.getElementById('completeProjects');
    const openBidsCount = document.getElementById('openBidsCount');
    const pendingBidsCount = document.getElementById('pendingBidsCount');
    const closedBidsCount = document.getElementById('closedBidsCount');
    const bidsChartCanvas = document.getElementById('bidsChart');

    // Sample data for projects and bids
    const projectsData = [
		{ projectName: 'Project A', description: 'Complete Project A', location: 'Gauteng'},
		{ projectName: 'Project B', description: 'Complete Project B', location: 'Limpopo'},
		{ projectName: 'Project C', description: 'Complete Project C', location: 'Free State'},
		{ projectName: 'Project D', description: 'Complete Project D', location: 'Free State'},
		{ projectName: 'Project E', description: 'Complete Project E', location: 'North West'}
	];
    const bidsData = [
        { contractorName: 'Contractor 1', projectName: 'Project A', bidAmount: 1000, status: 'open' },
        { contractorName: 'Contractor 2', projectName: 'Project B', bidAmount: 1500, status: 'pending' },
        { contractorName: 'Contractor 3', projectName: 'Project C', bidAmount: 2000, status: 'closed' },
		{ contractorName: 'Contractor 1', projectName: 'Project A', bidAmount: 5000, status: 'open' },
        { contractorName: 'Contractor 2', projectName: 'Project A', bidAmount: 1500, status: 'pending' },
        { contractorName: 'Contractor 3', projectName: 'Project C', bidAmount: 20000, status: 'closed' }
    ];

    // Function to load projects into the projects table
    function loadProjects() {
        projectsTableBody.innerHTML = ''; // Clear existing rows
        projectsData.forEach((project, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${project.projectName}</td>
                <td>${project.description}</td>
                <td>${project.location}</td>
                <td>
                    <button class="editProject" data-index="${index}">Edit</button>
                    <button class="deleteProject" data-index="${index}">Delete</button>
                </td>
            `;
            projectsTableBody.appendChild(row);
        });
    }

    // Function to load bids into the bids table
    function loadBids() {
        bidsTableBody.innerHTML = ''; // Clear existing rows
        bidsData.forEach(bid => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bid.contractorName}</td>
                <td>${bid.projectName}</td>
                <td>${bid.bidAmount}</td>
                <td>${bid.status}</td>
                <td>
                    <button class="deleteBid" data-project="${bid.projectName}">Delete</button>
                </td>
            `;
            bidsTableBody.appendChild(row);
        });
        updateAnalytics();
    }

    // Function to update analytics overview
    function updateAnalytics() {
        const openBids = bidsData.filter(bid => bid.status === 'open').length;
        const pendingBids = bidsData.filter(bid => bid.status === 'pending').length;
        const closedBids = bidsData.filter(bid => bid.status === 'closed').length;

        openBidsCount.textContent = openBids;
        pendingBidsCount.textContent = pendingBids;
        closedBidsCount.textContent = closedBids;

        // Update the chart
        updateChart(openBids, pendingBids, closedBids);
    }

    // Function to update the chart
    function updateChart(open, pending, closed) {
        const ctx = bidsChartCanvas.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Open Bids', 'Pending Bids', 'Closed Bids'],
                datasets: [{
                    label: 'Number of Bids',
                    data: [open, pending, closed],
                    backgroundColor: [
                        '#A05AFF',
                        '#FE9496',
                        '#7DA0FA'
                    ],
                    borderColor: [
                        'rgba(35, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Handle project form submission
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const projectName = document.getElementById('projectName').value;
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;

        // Validate the input (basic validation)
        if (!projectName || !description || !location) {
            alert('Please fill in all fields.');
            return;
        }

        // Create a new project object
        const newProject = {
            projectName,
            description,
            location
        };

        // Add the new project to the projectsData array
        projectsData.push(newProject);

        // Log the new project (you would typically send this to your server)
        console.log('New Project Added:', newProject);

        // Clear the form
        projectForm.reset();

        // Reload the projects table to include the new project
        loadProjects();
    });

    // Handle delete project action
    projectsTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteProject')) {
            const index = event.target.getAttribute('data-index');
            projectsData.splice(index, 1); // Remove the project from the array
            loadProjects(); // Reload projects after deletion
        }
    });

    // Handle edit project action
    projectsTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('editProject')) {
            const index = event.target.getAttribute('data-index');
            const project = projectsData[index];

            // Populate the form with the project data for editing
            document.getElementById('projectName').value = project.projectName;
            document.getElementById('description').value = project.description;
            document.getElementById('location').value = project.location;

            // Remove the project from the array for editing
            projectsData.splice(index, 1);
            loadProjects(); // Reload projects after removing the project for editing
        }
    });

    // Handle logout button click
    logoutButton.addEventListener('click', () => {
        console.log('User  logged out');
        window.location.href = '/views/index.html'; // Example redirect
    });
	// Handle gallery button click
    completeProjects.addEventListener('click', () => {
        console.log('Gallery redirect');
        window.location.href = '/views/gallery.html'; // Example redirect
    });
	// Handle contacts button click
    contacts.addEventListener('click', () => {
        console.log('Contacts redirect');
        window.location.href = '/views/contacts.html'; // Example redirect
    });
	// Handle legal button click
    policy.addEventListener('click', () => {
        console.log('Legal redirects');
        window.location.href = '/views/legal.html'; // Example redirect
    });
	// Handle legal button click
    about.addEventListener('click', () => {
        console.log('Legal redirects');
        window.location.href = '/views/about.html'; // Example redirect
    });
	
    // Handle delete bid action
    bidsTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteBid')) {
            const projectName = event.target.getAttribute('data-project');
            console.log('Bid deleted for project:', projectName);
            const index = bidsData.findIndex(bid => bid.projectName === projectName);
            if (index > -1) {
                bidsData.splice(index, 1);
                loadBids(); // Reload bids after deletion
            }
        }
    });

	// Function to filter bids based on search input
	function filterBids() {
		const input = document.getElementById('searchBids');
		const filter = input.value.toLowerCase();
		const rows = document.querySelectorAll('#bidsTable tbody tr');

		rows.forEach(row => {
			const cells = row.getElementsByTagName('td');
			let found = false;

			for (let i = 0; i < cells.length; i++) {
				if (cells[i].textContent.toLowerCase().includes(filter)) {
					found = true;
					break;
				}
			}

			row.style.display = found ? '' : 'none'; // Show or hide the row
		});
	}

	// Event listener for the search button
	document.getElementById('searchButton').addEventListener('click', filterBids);

	// Event listener for the search input to trigger search on "Enter" key
	document.getElementById('searchBids').addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			filterBids();
		}
	});

    // Load initial data
    loadProjects();
    loadBids();
});