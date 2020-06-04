export function firebaseAddPosts(event){
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
}
//função para adicionar posts
function addPosts(post) {
    const postTemplate = `<li id="${post.id}">${post.data().text} <br/> 💜${post.data().likes}</li>`;
    document.getElementById("posts").innerHTML += postTemplate;
}
//função para ler e carregar todos os posts feitos pelo usuário
export function loadPosts() {
    const postCollection = firebase.firestore().collection("postagens");
    postCollection.get().then(snap => {
        snap.forEach(post => {
            addPosts(post)
        })
    })
}