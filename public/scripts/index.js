import routes from "./routes.js";

const main = document.querySelector('#root');

const renderPage = () => {
    main.innerHTML = '';
    firebase.auth().onAuthStateChanged(user => {
        let path = user !== null ? 'home' : 'login';

        if(!location.hash || user === null) {
            location.hash = path;
        }

        main.appendChild(routes[location.hash]);
    });
}

window.addEventListener('load', renderPage);

window.addEventListener('hashchange', renderPage);