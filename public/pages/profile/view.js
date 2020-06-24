import controllerProfile from './profile.js';

export default () => {
  const template = `
      <main class="mainly-home"> 

        <section class="user__edit">
          <figure class="user__avatar" >
              <img src="" id="user-avatar" alt="Profile Photo">	
          </figure>

          <div class="user__data">
            <input type="file" name="avatar" class="input__avatar" id="user-photo" accept="image/png, image/jpeg"/>
            <button type="submit" class="form__button" id="update-user-photo">Update picture</button>
            <input value="Name" class="form__field" id="user-name"/>
            <button type="submit" class="form__button" id="update-user-name">Update name</button>
            <input value="Email" class="form__field" id="user-email"/>
            <button type="submit" class="form__button" id="update-user-email">Update email</button>
            <input value="Password" class="form__field" type="password" id="user-pwd"/>
            <button type="submit" class="form__button" id="update-user-pwd">Update password</button>
          </div>

        </section>

        <section class="post-profile">
            <ul id="personal-posts" class="post-feed"></ul>
        </section>

      </main>
    `;
  return controllerProfile(template);
};