import controllerLogin from './controller.js';

export default () => {
  const template = `
    <section class="login_header">
      <img src="../../img/logo.svg"/>
    </section>
    <form id="form-login" class="login-form form">
      <section class="form__box">
        <input class="form__field" type="email" name="email" autocomplete="email" placeholder="Enter E-mail" required>
        <input class="form__field" type="password" name="password" autocomplete="password" placeholder="Enter Password" required>
        <input class="form__button" type="submit" value="Login">
      </section>
    </form> 
    <section class="enter">
        <p class="option_form">Login with Gmail:</p>
    <button id="gmail-auth" class="button-gmail">
      <i class="icon-gmail"></i>
    </button>
    </section>
    <section class="enter__register">
        <p>Don't have an account?</p>
        <a class="enter__register-link" href="/#register">register here</a>
    </section>
  `;

  return controllerLogin(template);
};
