export default () =>{
    const container = document.createElement("div");
    const template = `
      <h1>Register to share knowledge!</h1>
      <form class="register-e-mail-form">
        <div>
          <label for="email-input"><b>E-mail</b></label>
          <input type="email" id="email-input" placeholder="Enter E-mail" required>
          <label for="password-input"><b>Password</b></label>
          <input type="password" id="password-input" placeholder="Enter Password" required>
          <input type="submit" id="submit-user-form" value="Create an account">
        </div>
      </form> 
        <div class="register-gmail-section">
          <p>Register using Gmail:</p>
          <div id="firebaseui-auth-container"></div>
        </div>
    `;
    container.innerHTML = template;
    return container;
};