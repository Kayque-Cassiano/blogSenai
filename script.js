const contCardComents = document.getElementById("contCardComents");
const contCardBlog = document.getElementById("contCardBlog");
const imgCard = document.getElementById("imgCard");
const article = document.getElementById("article");

function puxaDadosApi() {
  Promise.all([
    fetch("https://dummyjson.com/comments").then((res) => res.json()),
    fetch("https://api.thecatapi.com/v1/images/search?limit=10").then((res) =>
      res.json()
    ),
  ])
    .then(([dadosComentarios, imagens]) => {
      const comentarios = dadosComentarios.comments;

      comentarios.slice(0, 4).forEach((comentario, index) => {
        article.innerHTML += `
          <div class="cardHero">
            <img src="${imagens[index].url}" alt="Imagem de um gato">
            <div class="textCard">
                <div class="userTextCard">
                <p>${comentario.user.fullName}</p>
              </div>
              <div class="tituloCard">
                <h6>"${comentario.body}"</h6>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch((error) => console.error("Erro ao buscar dados:", error));
}

function postsAPI() {
  Promise.all([
    fetch("https://dummyjson.com/posts").then((res) => res.json()),
    fetch("https://api.thecatapi.com/v1/images/search?limit=10").then((res) =>
      res.json()
    ),
  ])
    .then(([post, imagens]) => {
      const posts = post.posts;

      posts.slice(0, 6).forEach((post, index) => {
        contCardBlog.innerHTML += `
          <div class="cardBlog">
            <div class="imgCardBlog">
                <img src="${imagens[index].url}" alt="Imagem de um gato">
            </div>
            <div class="titulo">
              <h5>${post.title}</h5>
            </div>
            <div class="contViews">
              <div class="view">
                <img src="assets/view.svg" alt="">
                <p>${post.views}</p>
              </div>
              <div class="like">
                <img src="assets/like.svg" alt="">
                <p>${post.reactions.likes}</p>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch((error) => console.error("Erro ao buscar posts:", error));
}

window.onload = () => {
  puxaDadosApi();
  postsAPI();
};