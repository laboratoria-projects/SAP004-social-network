export default () =>{
    const container = document.createElement("div");
    const template = `
      <form class="login-form" onsubmit="return false">
        <div>
          <label for="email-input"><b>E-mail</b></label>
          <input type="email" id="email-input" placeholder="Enter E-mail" required>
          <label for="password-input"><b>Password</b></label>
          <input type="password" id="password-input" placeholder="Enter Password" required>
          <input type="submit" id="submit-user-form" value="Login">
        </div>
      </form> 
        <div class="Login-with-gmail">
          <p>Login with Gmail:</p>
        </div>
        <div>
          <p>Don't have an account?</p>
          <a href="/#auth">Create Here</a>
          <div id="firebaseui-auth-container"></div>
        </div>
    `;
    container.innerHTML = template;
    return container;
};