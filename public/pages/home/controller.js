import renderPosts from './render-post.js';

function error(e) {
  console.log(e);
}

function success() {
  window.location.hash = 'login';
}

async function loggout(e) {
  try {
    e.preventDefault();

    await firebase.auth().signOut();

    success();
  } catch (erro) {
    error(erro);
  }
}

async function countLikes(e) {
  e.preventDefault();

  const db = firebase.firestore();

  const doc = await db.collection('postagens').doc(e.target.parentElement.parentElement.id);

  const post = await doc.get();

  await doc.set({ likes: post.data().likes + 1 }, { merge: true });

  renderPosts();
}


async function editPost(e) {
  e.preventDefault();

  const fieldPost = e.target.parentElement.parentElement.parentElement.querySelector('.message-post');
  const db = firebase.firestore();
  const id = e.target.parentElement.parentElement.parentElement.id;

  if (fieldPost.getAttribute('contentEditable', true)) {
    fieldPost.setAttribute('contentEditable', false);
    const textContent = fieldPost.textContent;

    await db.collection('postagens').doc(id).set({
      ...e.target.parentElement.parentElement.parentElement.post,
      text: textContent,
    });
    renderPosts();
  } else {
    fieldPost.setAttribute('contentEditable', true);
    fieldPost.focus();
  }
}


async function editAudience(e) {
  e.preventDefault();
  const db = firebase.firestore();
  const id = e.target.parentElement.parentElement.parentElement.id;
  await db.collection('postagens').doc(id).get().then((doc) => {
    if (doc.exists) {
      db.collection('postagens').doc(id).set({
        ...e.target.parentElement.parentElement.parentElement.post,
        private: !doc.data().private,
      });
      console.log('The post audience was changed');
    } else {
      console.log('No such document!');
    }
  });
  renderPosts();
}

async function deletePost(e) {
  e.preventDefault();

  const db = await firebase.firestore();
  const id = e.target.parentElement.parentElement.parentElement.id;

  await db.collection('postagens').doc(id).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch(() => {
      console.error('Error removing document: ', error);
    });

  renderPosts();
}

function eventsPost(listPosts) {
  listPosts.querySelectorAll('button.like-button').forEach(button => button.addEventListener('click', countLikes));
  listPosts.querySelectorAll('button.edite-button').forEach(button => button.addEventListener('click', editPost));
  listPosts.querySelectorAll('button.delete-button').forEach(button => button.addEventListener('click', deletePost));
  listPosts.querySelectorAll('button.audience-button').forEach(button => button.addEventListener('click', editAudience));
}

async function newPost(e) {
  e.preventDefault();

  const db = firebase.firestore();
  try {
    await db.collection('postagens').add({
      user: firebase.auth().currentUser.uid,
      text: e.target.elements.post.value,
      private: e.target.elements.audience.checked,
      likes: 0,
      date: Date.now(),
    });
    renderPosts();
  } catch (erro) {
    console.log(erro);
  }
}

function stateMenu(e) {
  e.preventDefault();

  const nav = document.querySelector('#nav');

  if (nav.classList.value === 'container-menu-burguer active') {
    nav.classList.remove('active');
    nav.classList.add('disable');
  } else {
    nav.classList.remove('disable');
    nav.classList.add('active');
  }
}


function privatePost() {
  const checkbox = document.querySelector('#private-selector');
  const iconLock = document.querySelector('#icon-lock');

  if (checkbox.checked === true) {
    iconLock.classList.remove('icon-lock-closed');
    iconLock.classList.add('icon-lock-open');
  } else {
    iconLock.classList.remove('icon-lock-open');
    iconLock.classList.add('icon-lock-closed');
  }
}

function controllerHome(template) {
  const container = document.createElement('div');
  container.classList.add('home');
  container.innerHTML = template;

  const formPost = container.querySelector('#form-post');
  const buttonLoggout = container.querySelector('#loggout');
  const iconMenu = container.querySelector('#icon-menu');
  const lock = container.querySelector('#lock');

  renderPosts();

  formPost.addEventListener('submit', newPost);
  buttonLoggout.addEventListener('click', loggout);
  iconMenu.addEventListener('click', stateMenu);
  lock.addEventListener('click', privatePost);

  return container;
}

export default controllerHome;
export { eventsPost };
