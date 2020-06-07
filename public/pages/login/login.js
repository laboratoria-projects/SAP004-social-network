export function stateUserChange() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
      alert("Welcome" + " " + user.email);
    } 
  })
}

export function loginEmail(){
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const loginUserButton = document.getElementById("submit-user-form");

  loginUserButton.addEventListener("click", () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .catch(function(error){
     const errorCode = error.code;
     const errorMessage = error.message;
     if(errorCode === 'auth/wrong-password'){
       alert('Wrong password');
     } else {
       alert(errorMessage);
     }
    });
    })
    firebase.auth().onAuthStateChanged(function(user) {
      if (user != null) {
        location.hash="#home"
      }
    })
  }

  export function loginGmail(ui){
    ui.reset();
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return true;
        },

      },
      signInFlow: 'popup',
      signInSuccessUrl: '#home'
    });
  }