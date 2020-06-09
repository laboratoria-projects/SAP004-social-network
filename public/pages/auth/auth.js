export function createUser(){
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const CreateUserButton = document.getElementById("submit-user-form");

CreateUserButton.addEventListener("click", () => {
	firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value).catch(function(error){
	  console.log(error.code);
	  alert(error.message);
	});
})
}

export function authGmail(ui){
  ui.reset();
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
  });
} 