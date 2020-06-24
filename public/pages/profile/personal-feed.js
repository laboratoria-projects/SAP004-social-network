import {
  eventsPost
} from '../home/home.js'

async function renderOnlyUserPosts() {
  const postes = await firebase.firestore()
    .collection('postagens')
    .orderBy('date', 'desc')
    .get();
  postes.forEach(
    (post) => {
      if (post.data().user === firebase.auth().currentUser.uid) {
        const ul = document.querySelector('#personal-posts');
        const li = document.createElement('li');
        li.innerHTML = `
                      <p class="message-post">${post.data().text}</p>
                      <section class="list-buttons">
                        <button class="like-button">
                          ${post.data().likes}
                          <i class="icon-heart heart-clicked"></i>
                        </button>
                        <button class="edit-button">
                          <i class="icon-pencil"></i>
                        </button>
                        <button class="delete-button">
                          <i class="icon-bin"></i>
                        </button>
                      </section> 
                      `;
        li.id = post.id;
        li.classList.add('list');
        li.post = post.data();
        ul.appendChild(li);
        eventsPost(ul);
      }
    });
}

export default renderOnlyUserPosts;
