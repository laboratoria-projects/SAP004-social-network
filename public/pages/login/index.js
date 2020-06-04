export default () => {
  const container = document.createElement('section');
  const template = `
      <form class="login-form form">
        <section class="form__box">
          <input id="email-input" class="form__field" type="email" placeholder="Enter E-mail" required>
          <input id="password-input" class="form__field" type="password" placeholder="Enter Password" required>
          <input id="submit-user-form" class="form__button" type="submit" value="Login">
        </section>
      </form> 
        <section class="enter">
          <p class="enter__logingmail">Login with Gmail:</p>
          <button id="firebaseui-auth-container"></button>
        </section>
        <section class="enter__register">
          <p>Don't have an account?</p>
          <a class="enter__register-link" href="/#auth">register here</a>
        </section>
    `;
  container.innerHTML = template;
  return container;
};
