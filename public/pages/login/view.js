import controllerLogin from './login.js';

export default () => {
  const template = `
    <header class="header">
      <img class="logo-mobile" src="../../img/logo.svg"/>
      <img class="logo-desktop" src="../../img/logo-desktop.svg"/>
    </header>
    <main class="container__auth">
      <form id="form-login" class="form__box">
        <fieldset class="form-title">
          <h1>Knowlegde</h1>
        </fieldset>
        <input class="form__field" type="email" name="email" autocomplete="email" placeholder="Enter E-mail" required>
        <input class="form__field" type="password" name="password" autocomplete="password" placeholder="Enter Password" required>
        <input class="form__button" type="submit" value="Login">
      </form> 
      <section class="enter">
        <p class="option_form">Login with Gmail:</p>
      <button id="gmail-auth" class="button-gmail">
        <i class="icon-gmail"></i>
      </button>
      </section>
      <section class="enter__register">
        <p>
          Don't have an account?
          <a class="option_form" href="/#register">Register here</a>
        </p>
      </section>
    </main>
  `;

  return controllerLogin(template);
};
