/******************************************************
 GLOBAL VARIABLES (FAKE USER DATABASE)
******************************************************/

// This variable stores who is currently logged in
let loggedInUser = null;

// This object simulates a database of users
// Each user has:
// - password
// - role
// - what pages they are allowed to access
const users = {
    admin: {
        password: "admin123",
        role: "admin",
        allowedPages: ["donor_page", "staff_page", "volunteer_page", "timesheet_page"]
    },
    staff: {
        password: "staff123",
        role: "staff",
        allowedPages: ["donor_page", "staff_page", "timesheet_page"]
    },
    volunteer: {
        password: "volunteer123",
        role: "volunteer",
        allowedPages: ["volunteer_page", "timesheet_page"]
    }
};


/******************************************************
 PAGE NAVIGATION FUNCTION
******************************************************/

// This function switches between pages
function showPage(pageId) {

    // Get all sections (pages)
    const pages = document.querySelectorAll(".page_section");

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active_page");
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add("active_page");
    }
}


/******************************************************
 ACCESS CONTROL FUNCTION
******************************************************/

// This function checks if user is allowed to view a page
function requestPageAccess(pageId) {

    const loginMessage = document.getElementById("loginMessage");

    // If user is NOT logged in
    if (!loggedInUser) {
        showPage("home_page");
        loginMessage.textContent = "Please log in first to access secured pages.";
        return;
    }

    // If user IS logged in, check permissions
    if (users[loggedInUser].allowedPages.includes(pageId)) {
        showPage(pageId);
        loginMessage.textContent = "";
    } else {
        // If user does NOT have permission
        showPage("home_page");
        loginMessage.textContent = "Access denied. You do not have permission.";
    }
}


/******************************************************
 UPDATE ROLE DISPLAY
******************************************************/

// This shows who is currently logged in
function updateRoleMessage() {

    const roleMessage = document.getElementById("currentUserRole");

    if (!loggedInUser) {
        roleMessage.textContent = "Not logged in.";
    } else {
        roleMessage.textContent = "Logged in as: " + users[loggedInUser].role;
    }
}


/******************************************************
 LOGOUT FUNCTION
******************************************************/

// Logs the user out and resets the page
function logoutUser() {

    loggedInUser = null;

    // Go back to home page
    showPage("home_page");

    const loginMessage = document.getElementById("loginMessage");
    loginMessage.textContent = "You have been logged out.";

    updateRoleMessage();
}


/******************************************************
 MAIN EVENT LISTENER (RUNS WHEN PAGE LOADS)
******************************************************/

document.addEventListener("DOMContentLoaded", function () {

    // Get all forms
    const loginForm = document.getElementById("loginForm");
    const staffForm = document.getElementById("staffForm");
    const timesheetForm = document.getElementById("timesheetForm");

    // Show initial login status
    updateRoleMessage();


    /******************************************************
     LOGIN FUNCTION
    ******************************************************/

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {

            // Prevent page refresh
            event.preventDefault();

            // Get user input
            const username = document.getElementById("username").value.trim().toLowerCase();
            const password = document.getElementById("password").value.trim();
            const loginMessage = document.getElementById("loginMessage");

            // Check if username exists
            if (!users[username]) {
                loginMessage.textContent = "Invalid username.";
                return;
            }

            // Check if password is correct
            if (users[username].password !== password) {
                loginMessage.textContent = "Invalid password.";
                return;
            }

            // Login successful
            loggedInUser = username;

            loginMessage.textContent = "Login successful. Welcome, " + users[username].role + ".";

            updateRoleMessage();

            // Clear form
            loginForm.reset();

            // Redirect user based on role
            if (users[username].role === "admin" || users[username].role === "staff") {
                showPage("donor_page");
            } else {
                showPage("volunteer_page");
            }
        });
    }


    /******************************************************
     STAFF MESSAGE FORM
    ******************************************************/

    if (staffForm) {
        staffForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const subject = document.getElementById("staffSubject").value.trim();
            const message = document.getElementById("staffMessage").value.trim();
            const staffStatus = document.getElementById("staffStatus");

            // Check permissions
            if (!loggedInUser || !users[loggedInUser].allowedPages.includes("staff_page")) {
                staffStatus.textContent = "Access denied. Staff login required.";
                return;
            }

            // Validate input
            if (subject === "" || message === "") {
                staffStatus.textContent = "Please complete all fields.";
                return;
            }

            staffStatus.textContent = "Message sent successfully.";

            // Reset form
            this.reset();
        });
    }


    /******************************************************
     TIME SHEET FORM
    ******************************************************/

    if (timesheetForm) {
        timesheetForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const employeeName = document.getElementById("employeeName").value.trim();
            const workDate = document.getElementById("workDate").value;
            const hoursWorked = document.getElementById("hoursWorked").value;
            const timesheetStatus = document.getElementById("timesheetStatus");

            // Check login access
            if (!loggedInUser || !users[loggedInUser].allowedPages.includes("timesheet_page")) {
                timesheetStatus.textContent = "Access denied. Login required.";
                return;
            }

            // Validate input
            if (employeeName === "" || workDate === "" || hoursWorked === "") {
                timesheetStatus.textContent = "Please fill in all fields.";
                return;
            }

            timesheetStatus.textContent = "Time sheet submitted successfully.";

            // Reset form
            this.reset();
        });
    }

});






