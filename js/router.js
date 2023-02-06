const routes = {
    "/": "<flight-page/>",
    "/personnel": "<employee-page/>"
}

const setView = (loc) => {
    let route = routes[loc];
    if(route) {
        document.getElementById("content").innerHTML = route;
    } else {
        document.getElementById("content").innerHTML = routes['/']
    }
}

window.addEventListener("click" , e => {
    if (e.target.matches("nav a")) {
        e.preventDefault();
        setView('/' + e.target.href.split('/').pop());
    }
});

setView();