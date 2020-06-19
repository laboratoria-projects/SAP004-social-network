import routes from './routes.js';

const main = document.querySelector('#root');

const renderPage = () => {
  main.innerHTML = '';
  firebase.auth().onAuthStateChanged((user) => {
    if (user === null && (location.hash === '#login' || location.hash === '#register' || !location.hash)) {
      location.hash = location.hash || 'login';
    } else {
      location.hash = 'home';
    }

    main.appendChild(routes[location.hash]);
  });
};

window.addEventListener('load', renderPage);

window.addEventListener('hashchange', renderPage);
