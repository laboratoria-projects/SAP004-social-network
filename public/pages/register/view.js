import controllerRegister from './controller.js';

export default () => {
  const template = `
    <header class="header">
      <img class="logo-mobile" src="../../img/logo.svg"/>
      <img class="logo-desktop" src="../../img/logo-desktop.svg"/>
    </header>
    <main class="container__auth">
      <form id="form-register" class="form__box">
        <fieldset class="form-title">
            <h1>Knowlegde</h1>
        </fieldset>
        <input class="form__field" type="email" name="email" autocomplete="email" placeholder="Enter E-mail" required />
        <input class="form__field" type="password" name="password" autocomplete="new-password" placeholder="Enter Password" required />
        <input class="form__button" type="submit" value="Create an account" />
      </form> 
      <section class="enter">
        <p class="option_form">Create with</p>
        <button id="gmail-auth" class="button-gmail">
          <i class="icon-gmail"></i>
        </button>
        <p class="back">
          Have a register? 
          <a href="#login" class="option_form">Back to Login</a>
        </p>
      </section>
    </main>
  `;

  return controllerRegister(template);
};
