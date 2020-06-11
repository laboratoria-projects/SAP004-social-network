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
    const postTemplate = `<li id="${id}">
    <p>${text}</p>
    <button class="likes">${like}</button>
    <span>💚</span>
    </li>`;
    postList.innerHTML += postTemplate;
    const likesBtn = document.querySelectorAll('.likes');
    likesBtn.forEach(like => {
        like.addEventListener('click', countLikes);
    });
}

async function countLikes(e) {
    e.preventDefault();
    const counter = e.target.value + 1;
    const doc = await firebase.firestore().collection('postagens').doc(e.target.parentElement.id);
    const post = await doc.get();
    await doc.set({ likes: post.data().likes + 1 }, { merge: true })
        .then(() => {
            return e.target.value = counter;
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