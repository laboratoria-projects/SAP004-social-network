import renderPosts from './render-post.js';

function error(e) {
    console.log(e)
}

function success() {
    location.hash = 'login';
}

async function loggout(e) {
    try {
        e.preventDefault();

        await firebase.auth().signOut();

        success();
    } catch (e) {
        error(e);
    }
}


function eventsPost(listPosts) {
    listPosts.querySelectorAll('button.like-button').forEach(button => button.addEventListener('click', countLikes));
    listPosts.querySelectorAll('button.edite-button').forEach(button => button.addEventListener('click', editPost));
    listPosts.querySelectorAll('button.delete-button').forEach(button => button.addEventListener('click', deletePost));
}


async function countLikes(e) {
    const db = firebase.firestore();

    const doc = await db.collection('postagens').doc(e.target.parentElement.id);

    const post = await doc.get();

    await doc.set({ likes: post.data().likes + 1 }, { merge: true });

    renderPosts();
}


async function editPost(e) {
    e.preventDefault();

    const button = e.target;
    const fieldPost = e.target.parentElement.querySelector('.message-post');
    const db = firebase.firestore();
    const id = e.target.parentElement.id;

    if (fieldPost.getAttribute('contentEditable', true)) {
        fieldPost.setAttribute('contentEditable', false);
        const textContent = fieldPost.textContent;

        await db.collection("postagens").doc(id).set({
            ...e.target.parentElement.post,
            text: textContent,
        })
        button.innerHTML = 'Edit';
        renderPosts();
    } else {
        fieldPost.setAttribute('contentEditable', true);
        fieldPost.focus();
        button.innerHTML = 'Salve'
    }

}

async function deletePost(e) {
    e.preventDefault();

    const db = await firebase.firestore();
    const id = e.target.parentElement.id;

    await db.collection('postagens').doc(id).delete().then(() => {
        console.log('Document successfully deleted!');
    }).catch((error) => {
        console.error('Error removing document: ', error);
    });

    renderPosts();
}

async function newPost(e) {
    e.preventDefault();

    const db = firebase.firestore();
    try {
        await db.collection('postagens').add({
            user: firebase.auth().currentUser.uid,
            text: e.target.elements.post.value,
            likes: 0,
            date: Date.now()
        })
        renderPosts();
    } catch (e) {
        console.log(e);
    }



}

function controllerHome(template) {
    const container = document.createElement('section');
    container.innerHTML = template;

    const formPost = container.querySelector('#form-post');
    const buttonLoggout = container.querySelector('#loggout');

    renderPosts();

    formPost.addEventListener('submit', newPost);
    buttonLoggout.addEventListener('click', loggout);

    return container;
}

export default controllerHome;
export { eventsPost };