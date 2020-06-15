import controllerHome from './controller.js'

export default () => {
  const template = `
    <button id="loggout">deslogar</button>

    <form id="form-post">
      <input type="text" name="post" placeholder="No que vc está pensando?"/>
      <input type="checkbox" id="private-selector" name="audience">
      <label for="private-selector">Private post</label>
      <button type="submit">Postar</button>
    </form>

    <ul id="list-posts"></ul>
  `;

  return controllerHome(template);
};