import routes from './routes.js';

const main = document.querySelector('#root');

const checkUserlogged = () => {
  return firebase.auth().onAuthStateChanged(user => {
    const internalPages = ["#home", "#profile"];
    if (user != null && internalPages.includes(location.hash)) {
      return true;
    } else {
      return false;
    }
  })
};

function renderPage() {
  let page = window.location.hash.replace("#", "");
  main.innerHTML = '';
  if (!checkUserlogged()) {
    page = 'login';
  }

  main.appendChild(routes[page]);
}

window.addEventListener('load', renderPage);
window.addEventListener('hashchange', renderPage);
