/******************************************************
 GLOBAL VARIABLES (FAKE USER DATABASE)
******************************************************/

let loggedInUser = null;

const users = {
    admin: {
        password: "admin123",
        role: "admin",
        allowedPages: ["donor_page", "staff_page", "volunteer_page", "timesheet_page", "firewall_page"]
    },
    staff: {
        password: "staff123",
        role: "staff",
        allowedPages: ["donor_page", "staff_page", "timesheet_page"] // ❌ no firewall
    },
    volunteer: {
        password: "volunteer123",
        role: "volunteer",
        allowedPages: ["volunteer_page", "timesheet_page"] // ❌ no firewall
    }
};


/******************************************************
 PAGE NAVIGATION FUNCTION
******************************************************/

function showPage(pageId) {

    const pages = document.querySelectorAll(".page_section");

    pages.forEach(function(page) {
        page.classList.remove("active_page");
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add("active_page");
    }
}


/******************************************************
 ACCESS CONTROL FUNCTION
******************************************************/

function requestPageAccess(pageId) {

    const loginMessage = document.getElementById("loginMessage");

    if (!loggedInUser) {
        showPage("home_page");
        loginMessage.textContent = "Please log in first to access secured pages.";
        return;
    }

    if (users[loggedInUser].allowedPages.includes(pageId)) {
        showPage(pageId);
        loginMessage.textContent = "";
    } else {
        showPage("home_page");
        loginMessage.textContent = "Access denied. You do not have permission.";
    }
}


/******************************************************
 UPDATE ROLE DISPLAY
******************************************************/

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

function logoutUser() {

    loggedInUser = null;

    showPage("home_page");

    const loginMessage = document.getElementById("loginMessage");
    loginMessage.textContent = "You have been logged out.";

    updateRoleMessage();
}


/******************************************************
 MAIN EVENT LISTENER
******************************************************/

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const staffForm = document.getElementById("staffForm");
    const timesheetForm = document.getElementById("timesheetForm");

    updateRoleMessage();


    /******************************************************
     LOGIN FUNCTION
    ******************************************************/

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const username = document.getElementById("username").value.trim().toLowerCase();
            const password = document.getElementById("password").value.trim();
            const loginMessage = document.getElementById("loginMessage");

            if (!users[username]) {
                loginMessage.textContent = "Invalid username.";
                return;
            }

            if (users[username].password !== password) {
                loginMessage.textContent = "Invalid password.";
                return;
            }

            loggedInUser = username;

            loginMessage.textContent = "Login successful. Welcome, " + users[username].role + ".";

            updateRoleMessage();

            loginForm.reset();

            // Redirect based on role
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

            if (!loggedInUser || !users[loggedInUser].allowedPages.includes("staff_page")) {
                staffStatus.textContent = "Access denied. Staff login required.";
                return;
            }

            if (subject === "" || message === "") {
                staffStatus.textContent = "Please complete all fields.";
                return;
            }

            staffStatus.textContent = "Message sent successfully.";

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

            if (!loggedInUser || !users[loggedInUser].allowedPages.includes("timesheet_page")) {
                timesheetStatus.textContent = "Access denied. Login required.";
                return;
            }

            if (employeeName === "" || workDate === "" || hoursWorked === "") {
                timesheetStatus.textContent = "Please fill in all fields.";
                return;
            }

            timesheetStatus.textContent = "Time sheet submitted successfully.";

            this.reset();
        });
    }

});