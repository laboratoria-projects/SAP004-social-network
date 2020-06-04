export default () => {
  const container = document.createElement('section');
  const template = `
      <form class="register-e-mail-form form">
        <section class="form__box">
          <input id="email-input" class="form__field" type="email" placeholder="Enter E-mail" required>
          <input id="password-input" class="form__field" type="password" placeholder="Enter Password" required>
          <input id="submit-user-form" class="form__button" type="submit" value="Create an account">
        </section>
      </form> 
        <section class="register-gmail-section enter">
          <p class="enter__logingmail">Create with</p>
          <button id="firebaseui-auth-container"></button>
        </section>
    `;
  container.innerHTML = template;
  return container;
};
