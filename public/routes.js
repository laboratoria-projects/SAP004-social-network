//main da página de login html, feita com lógica js
import login from "./pages/login/index.js"
//main da página de autenticação html, feita com lógica js
import auth from "./pages/auth/index.js";
//main da página de home (quando o user loga) 
import home from "./pages/home/index.js";

export default {
  login: login(),
  auth: auth(),
  home: home()
}