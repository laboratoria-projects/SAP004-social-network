import controllerRegister from './controller.js'

export default () => {
  const template = `
    <section class="login_header">
      <img src="../../img/logo.svg"/>
    </section>
    <form id="form-register" class="register-e-mail-form form">
      <section class="form__box">
        <input class="form__field" type="email" name="email" autocomplete="email" placeholder="Enter E-mail" required />
        <input class="form__field" type="password" name="password" autocomplete="new-password" placeholder="Enter Password" required />
        <input class="form__button" type="submit" value="Create an account" />
      </section>
    </form> 
    <section class="register-gmail-section enter">
      <p class="option_form">Create with</p>
      <button id="gmail-auth" class="button-gmail">
        <i class="icon-gmail"></i>
      </button>
      <a href="#login" class="option_form">Back to Login</a>
    </section>
  `;

  return controllerRegister(template);
};
