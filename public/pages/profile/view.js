export default () => {
    const template = `
      <header class="nav-home">
          <i id="icon-menu" class="icon-menu menu"></i>
          <nav id="nav" class="container-menu-burguer disable">
            <ul class="list-menu">
              <li>
                Option 1
              </li>
              <li>
                Option 2
              </li>
              <li class= "loggout-button" id="loggout">
                  Loggout
              </li>
            </ul>
          </nav>
          <h1 class="title-knowledge">Knowledge</h1>
      </header>
      <main class="mainly-home">
            <p id="user-name">User Name</p>
            <p id="user-email">User E-mail</p>
            <figure id="user-avatar">
                <img src="imagem.jpg" alt="Profile Photo">	
            </figure>
      </main>
    `;
  };
  