import controllerPersonalPosts from './controller.js'

export default () => {
  const template = `
                  <header class="nav-home">
                    <i id="icon-menu" class="icon-menu menu"></i>
                    <nav id="nav" class="container-menu-burguer disable">
                      <ul class="list-menu">
                      <a class="option_form" href="/#home">Home</a>
                     </ul>
                   </nav>
                    <h1 class="title-knowledge">Knowledge</h1>
                  </header>
                  <main class="mainly-home">
                    <ul id="personal-posts" class="post-feed"></ul>
                  </main>
                  `;
  return controllerPersonalPosts(template);
}
   