export function createPost() {
    const formPosts = document.getElementById("posts");
    formPosts.addEventListener("submit", function (event) {
        event.preventDefault();
        const text = document.getElementById("post-text").value;
        const privatePost = document.getElementById("private-selector").checked;
        const user = firebase.auth().currentUser;
        const id = user.uid;
        const date = new Date;


        const post = {
            text: text,
            date: date,
            private: privatePost,
            userId: id,
            likes: 0,
            comments: [],
        }
        const postCollection = firebase.firestore().collection("postagens");
        postCollection.add(post)
    });
}

function printPost(post) {
    if (!post) {
        return;
    }
    const postList = document.getElementById("post-list");
    const postTemplate = `<li id="${post.id}">${post.data().text} <br/> 💜${post.data().likes}</li>`;
    postList.innerHTML += postTemplate;
}

export function loadPosts() {
    const postCollection = firebase.firestore().collection("postagens").orderBy("date", "desc");
    postCollection.get().then(snap => {
        snap.forEach(post => {
            printPost(editAudiance(post));
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

export function userLogged() {
    var user = firebase.auth().currentUser;
    var email = user.email;
    var id = user.uid;
    const userInfo = document.getElementById("user-info");

    if (user != null) {
        userInfo.innerHTML = email, id;
    }
}

function editAudiance(post) {
    if (post.data().private === false) {
        return post;
    } else if (post.data().private === true && post.data().userId == firebase.auth().currentUser.uid) {
        return post;
    }
    return false;
}

