// Este é o ponto de entrada de sua aplicação
//import { home } from './pages/home/main.js';

//document.querySelector('#root').appendChild(home());
import {firebaseAddPosts, loadPosts} from "./pages/firestore/firestore.js";

//const main = document.querySelector('#root');

document.getElementById("posts").addEventListener("submit", firebaseAddPosts);

loadPosts();