// Este é o ponto de entrada de sua aplicação
//import { home } from './pages/home/main.js';

//document.querySelector('#root').appendChild(home());

document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      let app = firebase.app();
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
      document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
  });

  document.getElementById("posts").addEventListener("submit", function (event) {
    event.preventDefault();
    const text = document.getElementById("post-text").value;
    const post = {
        text: text,
        userId: "thais", //pegar variável com a id do usuário
        likes: 0,
        comments: []
    }
    //salvar post no banco de dados
    const postCollection = firebase.firestore().collection("postagens");
    postCollection.add(post);
});
//função para adicionar posts
function addPosts(post){
    const postTemplate = `<li id="${post.id}">${post.data().text} <br/> 💜${post.data().likes}</li>`;
    document.getElementById("posts").innerHTML += postTemplate;
}
//função para ler e carregar todos os posts feitos pelo usuário
function loadPosts(){
    const postCollection = firebase.firestore().collection("postagens");
    postCollection.get().then(snap => {
        snap.forEach(post => {
            addPosts(post)
        })
    })
}
loadPosts();