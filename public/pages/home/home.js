export function createPost(){
const formPosts = document.getElementById("posts");
formPosts.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = document.getElementById("post-text").value;
    var user = firebase.auth().currentUser;
    var id =  user.uid;
    const post = {
        text: text,
        userId: id, 
        likes: 0,
        comments: [],
    }
    const postCollection = firebase.firestore().collection("postagens");
    postCollection.add(post);
});
}

function addPosts (post){
    const postList = document.getElementById("post-list");
    const postTemplate = `<li id="${post.id}">${post.data().text} <br/> 💜${post.data().likes}</li>`;
    postList.innerHTML += postTemplate;
}

export function loadPosts(){
    const postCollection = firebase.firestore().collection("postagens");
    postCollection.get().then(snap => {
        snap.forEach(post => {
            addPosts(post)
        })
    })
}

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

export function userLogged(){
    var user = firebase.auth().currentUser;
    var  email = user.email;
    var id =  user.uid;
    const userInfo = document.getElementById("user-info");
  
    if (user != null) {
      userInfo.innerHTML = email, id;
    }
}