import renderOnlyUserPosts from './personal-feed.js';

async function renderProfile(container) {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      user.providerData.forEach((profile) => {
        const userNameInput = container.querySelector('#user-name');
        const userEmailInput = container.querySelector('#user-email');
        const userPhotoInput = container.querySelector('#user-avatar');

        userNameInput.value = profile.displayName;
        userEmailInput.value = profile.email;
        userPhotoInput.src = profile.photoURL;
      });
    }
  });
}

async function editName() {
  const name = document.getElementById('user-name');
  const user = firebase.auth().currentUser;

  await user.updateProfile({
    displayName: name.value,
  }).then(() => {
    alert('Update successful');
  }).catch((error) => {
    alert(`An ${error} happened.`);
  });
}

async function editEmail() {
  const user = firebase.auth().currentUser;
  const updateEmail = document.querySelector('#user-email');

  await user.updateEmail(updateEmail.value).then(() => {
    alert('Update successful.');
  }).catch((erro) => {
    console.log(erro);
  });
}

async function editPwd() {
  const user = firebase.auth().currentUser;
  const updatePwd = document.querySelector('#user-pwd');

  await user.updatePassword(updatePwd.value).then(() => {
    alert('Update successful.');
  }).catch((erro) => {
    console.log(erro);
  });
}

async function editPhoto(photoURL) {
  const user = firebase.auth().currentUser;

  await user.updateProfile({
    // eslint-disable-next-line object-shorthand
    photoURL: photoURL,
  }).then(() => {
    alert('Update successful');
  }).catch((error) => {
    alert(`An ${error} happened.`);
  });
}

function uploadAvatar() {
  const storageRef = firebase.storage().ref();
  const file = document.querySelector('#user-photo').files;
  const user = firebase.auth().currentUser;
  const uploadTask = storageRef.child(`user-avatar/${user.uid}-avatar`).put(file[0]);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} % done`);
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
        default:
          console.log('precisa de uma foto');
      }
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
        default:
          console.log('erro');
      }
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        editPhoto(downloadURL);
      });
    });
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

function controllerProfile(template) {
  const container = document.createElement('section');
  container.classList.add('profile-section');
  container.innerHTML = template;
  const iconMenu = container.querySelector('#icon-menu');

  container.querySelector('#update-user-name').addEventListener('click', editName);
  container.querySelector('#update-user-email').addEventListener('click', editEmail);
  container.querySelector('#update-user-pwd').addEventListener('click', editPwd);
  container.querySelector('#update-user-photo').addEventListener('click', uploadAvatar);
  iconMenu.addEventListener('click', stateMenu);

  renderOnlyUserPosts();
  renderProfile(container);

  return container;
}

export default controllerProfile;
