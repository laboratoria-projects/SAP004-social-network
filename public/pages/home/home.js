import renderPosts from './render-post.js';

function error(e) {
  console.log(e);
}

function success() {
  window.location.hash = 'login';
}

async function logout(e) {
  try {
    e.preventDefault();

    await firebase.auth().signOut();

    success();

  } catch (erro) {
    error(e);
  }
}

async function countLikes(e) {
  e.preventDefault();

  const doc = await firebase.firestore().collection('postagens')
    .doc(e.target.parentElement.parentElement.id);

  const post = await doc.get();

  const usersId = post.data().usersLikesPerPost;
  const currentUser = firebase.auth().currentUser.uid;
  if (usersId.includes(currentUser)) {
    await doc.update({
      likes: post.data().likes - 1,
      usersLikesPerPost: firebase.firestore.FieldValue.arrayRemove(currentUser)
    });
  } else {
    await doc.update({
      likes: post.data().likes + 1,
      usersLikesPerPost: firebase.firestore.FieldValue.arrayUnion(currentUser)
    })
  };
  renderPosts();
}

async function likes(e) {
  e.preventDefault();

  const db = firebase.firestore();

  const doc = await db.collection('comentarios').doc(e.target.parentElement.id);

  const comments = await doc.get();

  const usersId = comments.data().usersLikesPerComments;
  const currentUser = firebase.auth().currentUser.uid;
  if (usersId.includes(currentUser)) {
    await doc.update({
      likes: comments.data().likes - 1,
      usersLikesPerComments: firebase.firestore.FieldValue.arrayRemove(currentUser)
    });
  } else {
    await doc.update({
      likes: comments.data().likes + 1,
      usersLikesPerComments: firebase.firestore.FieldValue.arrayUnion(currentUser)
    })
  };

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

async function edit(e) {
  e.preventDefault();

  const fieldPost = e.target.parentElement.parentElement.querySelector('.message');
  const db = firebase.firestore();
  const id = e.target.parentElement.parentElement.id;

  if (fieldPost.getAttribute('contentEditable', true)) {
    fieldPost.setAttribute('contentEditable', false);
    const textContent = fieldPost.textContent;

    await db.collection('comentarios').doc(id).set(
      { text: textContent }, { merge: true },
    );

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

async function deletes(e) {
  e.preventDefault();

  const db = await firebase.firestore();
  const id = e.target.parentElement.parentElement.id;

  await db.collection('comentarios').doc(id).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch(() => {
      console.error('Error removing document: ', error);
    });

  renderPosts();
}

function eventsPost(listPosts) {
  listPosts.querySelectorAll('button.like-button').forEach(button => button.addEventListener('click', countLikes));
  listPosts.querySelectorAll('button.edit-button').forEach(button => button.addEventListener('click', editPost));
  listPosts.querySelectorAll('button.delete-button').forEach(button => button.addEventListener('click', deletePost));
  listPosts.querySelectorAll('button.audience-button').forEach(button => button.addEventListener('click', editAudience));
}

function eventsComments(listComments) {
  listComments.querySelectorAll('button.like-button').forEach(button => button.addEventListener('click', likes));
  listComments.querySelectorAll('button.edit-button').forEach(button => button.addEventListener('click', edit));
  listComments.querySelectorAll('button.delete-button').forEach(button => button.addEventListener('click', deletes));
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
      usersLikesPerPost: [],    
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

async function profile(container) {
  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user.providerData.forEach(function (profile) {

        const userNameInput = container.querySelector("#user-name");
        const userEmailInput = container.querySelector("#user-email");
        const userPhotoInput = container.querySelector("#user-avatar")

        userNameInput.innerHTML = profile.displayName;
        userEmailInput.innerHTML = profile.email;
        userPhotoInput.src = profile.photoURL;
      });
    }
  });
}

function controllerHome(template) {
  const container = document.createElement('div');
  container.classList.add('home');
  container.innerHTML = template;

  const formPost = container.querySelector('#form-post');
  const buttonLogout = container.querySelector('#logout');
  const iconMenu = container.querySelector('#icon-menu');
  const lock = container.querySelector('#lock');
  
  renderPosts();
 
  profile(container);

  formPost.addEventListener('submit', newPost);
  buttonLogout.addEventListener('click', logout);
  iconMenu.addEventListener('click', stateMenu);
  lock.addEventListener('click', privatePost);

  return container;
}

export default controllerHome;
export { eventsPost, eventsComments };
