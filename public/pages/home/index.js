export default () =>{
    const container = document.createElement("div");
    const template = `
     <p>Você está logado :D</p>
     <p>Página inicial da rede</p>
     <input id="logout-button" type="button" value="Sign-out">
    `;
    container.innerHTML = template;
    return container;
};