import { eventsPost } from './controller.js';

async function renderPosts() {
    const posts = await firebase.firestore()
        .collection('postagens')
        .orderBy('date', 'desc')
        .get();

    const listPosts = document.querySelector('#list-posts');

    listPosts.innerHTML = '';

    let html = [];

    posts.forEach(
        postRef => {
            const li = document.createElement('li');
            const post = postRef.data();
            
            li.innerHTML = `
                <p class="message-post">${post.text}</p>
                <button class="like-button">${post.likes}</button>
                <button class="edite-button">Edit</button>
                <button class="delete-button">Delete</button> 
            `;

            li.id = postRef.id;
            li.post = post;

            if (postRef.data().private === false) {
                html.push(li);
            } 
            else if (postRef.data().private === true && postRef.data().user === firebase.auth().currentUser.uid) {
                html.push(li);
            }
            
        },
    )


    listPosts.append(...html);

    eventsPost(listPosts);
}

export default renderPosts;