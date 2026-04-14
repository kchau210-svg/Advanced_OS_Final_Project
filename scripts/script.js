let loggedInUser = null;

const users = {
    admin: {
        password: "admin123",
        allowedPages: ["firewall_page"]
    },
    staff: {
        password: "staff123",
        allowedPages: []
    },
    volunteer: {
        password: "volunteer123",
        allowedPages: []
    }
};

function showPage(pageId) {
    document.querySelectorAll(".page_section").forEach(p => p.classList.remove("active_page"));
    document.getElementById(pageId).classList.add("active_page");
}

function requestPageAccess(pageId) {
    if (!loggedInUser) {
        alert("Please login first");
        return;
    }

    if (users[loggedInUser].allowedPages.includes(pageId)) {
        showPage(pageId);
    } else {
        alert("Access Denied");
    }
}

function logoutUser() {
    loggedInUser = null;
    showPage("home_page");
}

document.addEventListener("DOMContentLoaded", function () {

    // LOGIN
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        const msg = document.getElementById("loginMessage");

        if (!users[user] || users[user].password !== pass) {
            msg.textContent = "Invalid login";
            msg.style.color = "red";
            return;
        }

        loggedInUser = user;
        msg.textContent = "Login successful";
        msg.style.color = "green";
    });

    // FIREWALL TESTS
    const buttons = document.querySelectorAll(".firewall-btn");
    const status = document.getElementById("firewallStatus");

    buttons.forEach(btn => {
        btn.addEventListener("click", function () {

            const test = this.dataset.test;

            status.textContent = "Running test...";
            status.style.color = "orange";

            setTimeout(() => {

                if (test === "rule1") {
                    status.textContent = "HTTP allowed → Connection successful ✅";
                    status.style.color = "green";
                }

                if (test === "rule3") {
                    status.textContent = "Port 8080 blocked → Connection denied 🚫";
                    status.style.color = "red";
                }

                if (test === "rule5") {
                    status.textContent = "HTTPS outbound blocked → Request failed ⛔";
                    status.style.color = "red";
                }

                if (test === "rule4") {
                    status.textContent = "Ping successful → Host reachable ✅";
                    status.style.color = "green";
                }

                if (test === "rule6") {
                    status.textContent = "Incoming subnet allowed → Traffic accepted ✅";
                    status.style.color = "green";
                }

            }, 1200);
        });
    });

});