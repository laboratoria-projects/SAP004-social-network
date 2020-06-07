export function logout(){
const signOutButton = document.getElementById("logout-button")
signOutButton.addEventListener("click", () => {
    firebase.auth().signOut().then(function() {
        alert("Sign-out successful")
      }).catch(function(error) {
          alert("An error happened.")
      });     
})
}