// Este é o ponto de entrada de sua aplicação
//import { home } from './pages/home/main.js';

//document.querySelector('#root').appendChild(home());
import firestore from "./pages/firestore/index.js";
import {firebaseAddPosts, loadPosts} from "./pages/firestore/firestore.js";

const main = document.querySelector('#root');
window.addEventListener('load', () => {
    main.appendChild(firestore());
});

document.getElementById("posts").addEventListener("submit", firebaseAddPosts);
loadPosts();