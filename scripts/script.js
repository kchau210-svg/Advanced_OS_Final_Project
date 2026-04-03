function loadComponent(id, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("Could not find " + file);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(error));
}

loadComponent('header_main_container', '../components/header.html');
loadComponent('grid_main_container', '../pages/home.html');

function navigateTo(page) {
    console.log("Navigating to: " + page);
    loadComponent('grid_main_container', `../pages/${page}.html`);  
}

loadComponent('footer_main_container', '../components/footer.html');







