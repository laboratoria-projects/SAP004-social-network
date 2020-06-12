import controllerHome from './controller.js'

export default () =>{
  const template = `
    <button id="loggout">deslogar</button>

    <form id="form-post">
      <input type="text" name="post" placeholder="No que vc está pensando?"/>
      <button type="submit">Postar</button>
    </form>

    <ul id="list-posts"></ul>
  `;

  return controllerHome(template);
};