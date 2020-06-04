export default () => {
  const container = document.createElement('div');
  const template = `
    <p>Você está logado :D</p>
    <p>Página inicial da rede</p>
    `;
  container.innerHTML = template;
  return container;
};
