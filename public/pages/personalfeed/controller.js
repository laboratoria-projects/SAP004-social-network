async function renderPersonalPosts() {
  const posts = await firebase.firestore()
    .collection('postagens')
    .orderBy('date', 'desc')
    .get();

  const personalPosts = document.querySelector('#personal-posts');

  personalPosts.innerHTML = '';

  const html = [];

  // if (postRef.data().user !== firebase.auth().currentUser.uid) {
  //   post.style.display = "none";
  // } 
  // else {
    post.forEach(
      (postRef) => {
        const li = document.createElement('li');
        const post = postRef.data();
      
        li.innerHTML = `
                        <h3 class="user-name">${post.user}</h3>
                        <p class="message-post">${post.text}</p>
                        <section class="list-buttons">
                          <button class="like-button">
                            ${post.likes}
                            <i class="icon-heart heart-clicked"></i>
                          </button>
                          <button class="edite-button">
                            <i class="icon-pencil"></i>
                          </button>
                          <button class="delete-button">
                            <i class="icon-bin"></i>
                          </button>
                          <button class="audience-button">
                            <i id="icon-lock" class="${audience}"></i>
                          </button>
                        </section> 
                    `;

        li.id = postRef.id;
        li.classList.add('list');
        li.post = post;

        html.push(li);
      },
    );
    personalPosts.append(...html);
  // }
};

function controllerPersonalPosts(template) {
  const container = document.createElement('div');
  container.classList.add('home');
  container.innerHTML = template;
  renderPersonalPosts();
  return container;
}
export default controllerPersonalPosts;