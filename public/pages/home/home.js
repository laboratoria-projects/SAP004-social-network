export function createPost() {
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

function addPostsTemplate(post) {
    const postList = document.getElementById("post-list");
    const id = post.id;
    const text = post.data().text;
    const like = post.data().likes;
    // const li = document.createElement('li');
    // const postId = document.createAttribute(`id`);
    // postId.value = post.id;
    // const likesBtn = document.createElement('button')
    // li.innerHTML += `${post.data().text} <br/> <submit id>💜<submit> ${post.data().likes}`;
    // li.setAttributeNode(postId);
    // postList.appendChild(li);
    const postTemplate = `<li id="${post.id}"> <br/> ${text} <br/>
    <input type="button" class="likes" value="${like} 💜"></li>`;
    postList.innerHTML += postTemplate;
    // const postsId = document.querySelector(`#${post.id}`)
    // const likesBtn = postsId.querySelector(`.likes`);
    // likesBtn.addEventListener('click', countLikes(like));
}

function countLikes(like) {
    const counter = like + 1;
    firebase.firestore().collection('postagens').doc(post.id).update({
            likes: counter
        })
        .then(() => {
            likesBtn.value = `${counter} 💜`
        })
};

export function loadPosts() {
    const postCollection = firebase.firestore().collection("postagens");
    postCollection.get().then(snap => {
        snap.forEach(post => {
            addPostsTemplate(post)
        })
    })
}


export function logout() {
    const signOutButton = document.getElementById("logout-button")
    signOutButton.addEventListener("click", () => {
        firebase.auth().signOut().then(function () {
            alert("Sign-out successful")
        }).catch(function (error) {
            alert("An error happened.")
        });
    })
}