import controllerHome from './controller.js';

export default () => {
  const template = `
    <header class="nav-home">
        <i id="icon-menu" class="icon-menu menu"></i>
        <nav id="nav" class="container-menu-burguer disable">
          <ul class="list-menu">
            <li>
              Option 1
            </li>
            <li id="personal-posts">
              Personal Feed
            </li>
            <li class= "loggout-button" id="loggout">
                Loggout
            </li>
          </ul>
        </nav>
        <h1 class="title-knowledge">Knowledge</h1>
    </header>
    <main class="mainly-home">
      <form id="form-post" class="post-form">
          <input class="post-input" type="text" name="post" placeholder="Write your post!" />
          <section class="buttons-post">
            <section>
              <label id="lock" class="private-checkbox" for="private-selector">
                <i id="icon-lock" class="icon-lock-open"></i>
              </label>
              <input class="selector-checkbox" type="checkbox" id="private-selector" name="audience">
            </section>
              <button class="submit-post-button" type="submit">Share</button>
          </section>
      </form>

      <ul id="list-posts" class="post-feed"></ul>
    </main>
  `;

  return controllerHome(template);
};
