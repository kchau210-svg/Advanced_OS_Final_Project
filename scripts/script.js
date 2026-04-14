let loggedInUser = null;

const users = {
    admin: {
        password: "admin123",
        allowedPages: ["donor_page", "staff_page", "volunteer_page", "timesheet_page", "firewall_page"]
    },
    staff: {
        password: "staff123",
        allowedPages: ["donor_page", "staff_page", "timesheet_page"]
    },
    volunteer: {
        password: "volunteer123",
        allowedPages: ["volunteer_page", "timesheet_page"]
    }
};

function showPage(pageId) {
    document.querySelectorAll(".page_section").forEach(function (page) {
        page.classList.remove("active_page");
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add("active_page");
    }
}

function requestPageAccess(pageId) {
    const loginMessage = document.getElementById("loginMessage");

    if (!loggedInUser) {
        if (loginMessage) {
            loginMessage.textContent = "Please log in first.";
            loginMessage.style.color = "red";
        }
        showPage("home_page");
        return;
    }

    if (users[loggedInUser].allowedPages.includes(pageId)) {
        showPage(pageId);

        if (loginMessage) {
            loginMessage.textContent = "";
        }
    } else {
        if (loginMessage) {
            loginMessage.textContent = "Access denied.";
            loginMessage.style.color = "red";
        }
        showPage("home_page");
    }
}

function logoutUser() {
    loggedInUser = null;

    const loginMessage = document.getElementById("loginMessage");
    if (loginMessage) {
        loginMessage.textContent = "You have been logged out.";
        loginMessage.style.color = "green";
    }

    showPage("home_page");
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const firewallButtons = document.querySelectorAll(".firewall-btn");
    const firewallStatus = document.getElementById("firewallStatus");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim().toLowerCase();
            const password = document.getElementById("password").value.trim();
            const loginMessage = document.getElementById("loginMessage");

            if (!users[username] || users[username].password !== password) {
                if (loginMessage) {
                    loginMessage.textContent = "Invalid login.";
                    loginMessage.style.color = "red";
                }
                return;
            }

            loggedInUser = username;

            if (loginMessage) {
                loginMessage.textContent = "Login successful.";
                loginMessage.style.color = "green";
            }

            loginForm.reset();

            if (username === "admin" || username === "staff") {
                showPage("donor_page");
            } else {
                showPage("volunteer_page");
            }
        });
    }

    firewallButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (!firewallStatus) return;

            const test = this.dataset.test;

            firewallStatus.textContent = "Running test...";
            firewallStatus.style.color = "orange";

            setTimeout(function () {
                if (test === "rule1") {
                    firewallStatus.textContent = "HTTP allowed → Connection successful ✅";
                    firewallStatus.style.color = "green";
                }

                if (test === "rule3") {
                    firewallStatus.textContent = "Port 8080 blocked → Connection denied 🚫";
                    firewallStatus.style.color = "red";
                }

                if (test === "rule5") {
                    firewallStatus.textContent = "HTTPS outbound blocked → Request failed ⛔";
                    firewallStatus.style.color = "red";
                }

                if (test === "rule4") {
                    firewallStatus.textContent = "Ping successful → Host reachable ✅";
                    firewallStatus.style.color = "green";
                }

                if (test === "rule6") {
                    firewallStatus.textContent = "Incoming subnet allowed → Traffic accepted ✅";
                    firewallStatus.style.color = "green";
                }
            }, 1200);
        });
    });
});