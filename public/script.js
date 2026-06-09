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

// Load applications from localStorage
let applications =
    JSON.parse(localStorage.getItem("applications")) || [];

// Save applications
function saveApplications() {
    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );
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
            <p><strong>Date:</strong> ${app.date}</p>
            <p>
                <strong>Status:</strong>
                <span class="status-${app.status.toLowerCase()}">
                    ${app.status}
                </span>
            </p>
            <button class="delete-btn" onclick="deleteApplication(${app.id})">
                Delete
            </button>
        `;

        applicationList.appendChild(card);
    });

    updateStats();
}

// Add application
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const company = companyInput.value.trim();
    const role = roleInput.value.trim();

    if (!company || !role) {
        return;
    }

    const application = {
        id: Date.now(),
        company: company,
        role: role,
        status: statusInput.value,
        date: new Date().toLocaleDateString("en-IN")
    };

    applications.push(application);

    saveApplications();
    displayApplications();

    form.reset();
    companyInput.focus();
});

// Delete application
function deleteApplication(id) {

    applications = applications.filter(app => app.id !== id);

    saveApplications();
    displayApplications();
}

// Search applications
searchInput.addEventListener("input", function () {

    const searchValue =
        searchInput.value.toLowerCase();

    const filteredApplications =
        applications.filter(app =>
            app.company.toLowerCase().includes(searchValue) ||
            app.role.toLowerCase().includes(searchValue)
        );

    displayApplications(filteredApplications);
});

// Initial render
displayApplications();