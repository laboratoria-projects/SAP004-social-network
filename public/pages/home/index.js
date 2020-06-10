export default () =>{
    const container = document.createElement("div");
    const template = `
     <p>Você está logado :D</p>
     <p>Página inicial da rede</p>

     <input id="logout-button" type="button" value="Sign-out">

     <form id="posts">
        <input type="text" id="post-text"/>
        <input type="submit" value="Post">
      </form>

      <ul id="post-list"> </ul>
    `;

  container.innerHTML = template;
  return container;
};