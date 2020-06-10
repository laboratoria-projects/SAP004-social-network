export function createPost(){
const formPosts = document.getElementById("posts");
formPosts.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = document.getElementById("post-text").value;
    const post = {
        text: text,
        userId: "camila", 
        likes: 0,
        comments: [],
    }
    const postCollection = firebase.firestore().collection("postagens");
    postCollection.add(post);
});
}

function addPostsTemplate (post){
    const postList = document.getElementById("post-list");
    const li = document.createElement('li');
    const attribute = document.createAttribute(`id`);
    attribute.value = post.id;
    li.innerHTML += `${post.data().text} <br/> <submit>💜<submit> ${post.data().likes}`;
    li.setAttributeNode(attribute);
    postList.appendChild(li);
    //const postTemplate = `<li id="${post.id}">${post.data().text} <br/> 💜${post.data().likes}</li>`;
    //postList.innerHTML += postTemplate;
}

function countLikes () {

}

export function loadPosts(){
    const postCollection = firebase.firestore().collection("postagens");
    postCollection.get().then(snap => {
        snap.forEach(post => {
            addPostsTemplate(post)
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