import view from './view.js';

async function renderProfile(container) {
  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user.providerData.forEach(function (profile) {

        const userNameInput = container.querySelector("#user-name");
        const userEmailInput = container.querySelector("#user-email");
        const userPhotoInput = container.querySelector("#user-avatar");

        userNameInput.value = profile.displayName;
        userEmailInput.value = profile.email;
        userPhotoInput.src = profile.photoURL;
      });
    }
  });
}

async function editName() {
  const name = document.getElementById("user-name");
  const user = firebase.auth().currentUser;

  await user.updateProfile({
    displayName: name.value,
  }).then(function () {
    alert("Update successful");
  }).catch(function (error) {
    alert("An error happened.");
  });
}

async function editEmail() {

  const user = firebase.auth().currentUser;
  const updateEmail = document.querySelector("#user-email")

  await user.updateEmail(updateEmail.value).then(function () {
    alert("Update successful.");
  }).catch(function (error) {
    console.log(error);
  });

}

async function editPwd() {
  const user = firebase.auth().currentUser;
  const updatePwd = document.querySelector("#user-pwd");

  await user.updatePassword(updatePwd.value).then(function () {
    alert("Update successful.")
  }).catch(function (error) {
    console.log(error)
  });

}

function uploadAvatar() {
  let storageRef = firebase.storage().ref();
  let file = document.querySelector("#user-photo").files;
  let user = firebase.auth().currentUser
  let uploadTask = storageRef.child('user-avatar/' + user.uid + '-avatar').put(file[0]);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    function (snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        editPhoto(downloadURL);
      });
    });        
}

async function editPhoto(photoURL) {
  const user = firebase.auth().currentUser;

  await user.updateProfile({
    photoURL: photoURL,
  }).then(function () {
    alert("Update successful");
  }).catch(function (error) {
    alert("An error happened.");
  });
}

function controllerProfile(template) {
  const container = document.createElement('section');
  container.innerHTML = template;

  container.querySelector("#update-user-name").addEventListener('click', editName);
  container.querySelector("#update-user-email").addEventListener('click', editEmail);
  container.querySelector("#update-user-pwd").addEventListener('click', editPwd);
  container.querySelector("#update-user-photo").addEventListener('click', uploadAvatar);

  renderProfile(container);

  return container;
}

export default controllerProfile;