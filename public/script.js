// API URL
const API_URL = "http://localhost:5000/api/applications";

// Get elements
const form = document.getElementById("application-form");
const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const statusInput = document.getElementById("status");

const applicationList = document.getElementById("application-list");
const searchInput = document.getElementById("search-input");

const totalApplications = document.getElementById("total-applications");
const appliedCount = document.getElementById("applied-count");
const interviewCount = document.getElementById("interview-count");
const acceptedCount = document.getElementById("accepted-count");
const rejectedCount = document.getElementById("rejected-count");

let applications = [];

// Fetch applications from MongoDB
async function fetchApplications() {
    try {
        const response = await fetch(API_URL);

        applications = await response.json();

        displayApplications();
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

// Update stats cards
function updateStats() {
    totalApplications.textContent = applications.length;

    let applied = 0;
    let interview = 0;
    let accepted = 0;
    let rejected = 0;

    applications.forEach(app => {
        if (app.status === "Applied") {
            applied++;
        } else if (app.status === "Interview") {
            interview++;
        } else if (app.status === "Accepted") {
            accepted++;
        } else if (app.status === "Rejected") {
            rejected++;
        }
    });

    appliedCount.textContent = applied;
    interviewCount.textContent = interview;
    acceptedCount.textContent = accepted;
    rejectedCount.textContent = rejected;
}

// Display applications
function displayApplications(list = applications) {
    applicationList.innerHTML = "";

    if (list.length === 0) {
        applicationList.innerHTML =
            "<p id='empty-message'>No applications found.</p>";

        updateStats();
        return;
    }

    list.forEach(app => {
        const card = document.createElement("div");

        card.classList.add("application-card");

        card.innerHTML = `
            <h3>${app.company}</h3>
            <p><strong>Role:</strong> ${app.role}</p>
            <p><strong>Date:</strong> ${new Date(app.date).toLocaleDateString("en-IN")}</p>
            <p>
                <strong>Status:</strong>
                <span class="status-${app.status.toLowerCase()}">
                    ${app.status}
                </span>
            </p>
            <button class="delete-btn" onclick="deleteApplication('${app._id}')">
                Delete
            </button>
        `;

        applicationList.appendChild(card);
    });

    updateStats();
}

// Add application
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const company = companyInput.value.trim();
    const role = roleInput.value.trim();

    if (!company || !role) {
        return;
    }

    const application = {
        company,
        role,
        status: statusInput.value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application)
        });

        if (response.ok) {
            await fetchApplications();

            form.reset();
            companyInput.focus();
        }
    } catch (error) {
        console.error("Error adding application:", error);
    }
});

// Delete application
async function deleteApplication(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        await fetchApplications();
    } catch (error) {
        console.error("Error deleting application:", error);
    }
}

// Search applications
searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();

    const filteredApplications =
        applications.filter(app =>
            app.company.toLowerCase().includes(searchValue) ||
            app.role.toLowerCase().includes(searchValue)
        );

    displayApplications(filteredApplications);
});

// Initial render
fetchApplications();