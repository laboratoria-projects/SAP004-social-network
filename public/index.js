//rotas 
import routes from "./routes.js";
//main da página de login html, feita com lógica js
import login from "./pages/login/index.js";
//login parte lógica js com firebase, ligação com form e gmail auth.
import {loginGmail, loginEmail, stateUserChange} from "./pages/login/login.js";
//main da página de autenticação html, feita com lógica js
import auth from "./pages/auth/index.js";
//autenticação lógica js com firebase, ligação com o form
import {createUser, authGmail} from "./pages/auth/auth.js";
//functions da home depois do user logado 
import { createPost, loadPosts, logout, userLogged} from "./pages/home/home.js";

const main = document.querySelector('#root');
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const init = () => {
window.addEventListener("hashchange", () => {
    renderPage();
    })
}

const renderPage = () => {
    main.innerHTML = "";
    const page = validateHash(window.location.hash);
    main.appendChild(routes[page]);
    callFunctions(page);
}

const validateHash = (hash) => {
    if(hash ===""){
        return "login"
    }else{
        return hash.replace("#","")
    }
}

window.addEventListener("load",() => {
    renderPage();
    init();
});

function callFunctions(page){
    switch (page){
        case "auth":
            createUser();
            authGmail(ui); 
            break;
        case "login":
            stateUserChange();
            loginGmail(ui); 
            loginEmail();
            break;
        case "home":
            userLogged();
            createPost();
            loadPosts();
            logout();
            break;
        default:
            break;
    }
}