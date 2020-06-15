import controllerHome from './controller.js'

export default () => {
  const template = `
    <nav class="nav-home">
        <button class= "loggout-button" id="loggout">Loggout</button>
        <h1 class="title-knowledge">Knowledge</h1>
        <div class="container-menu-burguer">
            <input type="checkbox" id="checkbox-menu">
            <label for="checkbox-menu">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    </nav>
    <form id="form-post" class="post-form">
        <input class="post-input" type="text" name="post" placeholder="Write your post!" />
        <div class="buttons-post">
          <div>
            <input class="selector-checkbox" type="checkbox" id="private-selector" name="audience">
            <label class="private-checkbox" for="private-selector">Private post</label>
          </div>
            <button class="submit-post-button" type="submit">Post</button>
        </div>
    </form>

    <ul id="list-posts"></ul>
  `;

  return controllerHome(template);
};