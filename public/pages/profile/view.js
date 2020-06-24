import controllerProfile from './profile.js';

export default () => {
  const template = `
      <main class="mainly-home">
        <section class="personal-profile">  
          <figure>
              <img src="" id="user-avatar" alt="Profile Photo" class="profile-img">	
          </figure>
            <input type="file" id="user-photo"/>
            <button type="submit" id="update-user-photo">Update</button>
            <input value="Name" id="user-name"/>
            <button type="submit" id="update-user-name">Update</button>
            <input value="Email" id="user-email"/>
            <button type="submit" id="update-user-email">Update</button>
            <input value="Password" type="password" id="user-pwd"/>
            <button type="submit" id="update-user-pwd">Update</button>
        </section>
        <section class="posts-profile">
          <ul id="personal-posts" class="post-feed"></ul>
        </section>
      </main>
    `;
  return controllerProfile(template);
};

