let mensagem = "";
const express = require("express");

const port = process.env.PORT || 3000;
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const listaFilmes = [
  {
    id: 1,
    titulo: "Extraordinário",
    classificacao: "10 anos",
    resumo:
      "Auggie Pullman é um garoto que nasceu com uma deformidade facial e precisou passar por 27 cirurgias plásticas. Aos 10 anos, ele finalmente começa a frequentar uma escola regular, como qualquer outra criança, pela primeira vez. No quinto ano, ele precisa se esforçar para conseguir se encaixar em sua nova realidade.",
    imagem: "https://m.media-amazon.com/images/I/51Szr+3Dy4L.jpg",
  },

  {
    id: 2,
    titulo: "Spiderhead",
    classificacao: "16 anos",
    resumo:
      "Spiderhead é o próximo filme americano de ficção científica de 2022 dirigido por Joseph Kosinski e escrito por Rhett Reese e Paul Wernick, baseado no conto Escape from Spiderhead de George Saunders.",
    imagem:
      "https://apostiladecinema.com.br/wp-content/uploads/2022/06/spiderhead-2022-filme-netflix-critica-apostila-de-cinema-poster.jpg",
  },

  {
    id: 3,
    titulo: "Hustle",
    classificacao: "12 anos",
    resumo:
      "Um olheiro de basquete azarado encontra um jogador com um grande potencial e se esforça para mostrar ao mundo que os dois merecem chegar à NBA.",
    imagem:
      "https://classic.exame.com/wp-content/uploads/2022/06/Hustle-1097x1536-1.jpg?quality=70&strip=info&w=731",
  },

  {
    id: 4,
    titulo: "Extraordinário",
    classificacao: "Livre",
    resumo:
      "Uma família extraordinária que vive escondida nas montanhas da Colômbia, em uma casa mágica, em uma cidade vibrante, em um lugar maravilhoso conhecido como um Encanto. A magia deste Encanto abençoou todos os meninos e meninas da família com um dom único, desde superforça até o poder de curar. Todos, exceto Mirabel. Mas, quando ela descobre que a magia que cerca o Encanto está em perigo, Mirabel decide que ela, a única Madrigal sem poderes mágicos, pode ser a última esperança de sua família excepcional",
    imagem:
      "https://revistaoeste.com/wp-content/uploads/2022/01/encanto-2021-768x1139.jpg",
  },
];

let filme = undefined;

app.get("/", function (req, res) {
  res.render("index", { listaFilmes, filme });
});

app.post("/create", (req, res) => {
  const filme = req.body;
  filme.id = listaFilmes.length + 1;
  listaFilmes.push(filme);
  mensagem = `Filme inserido com sucesso!`
  res.redirect("/#cards");
});

app.get("detalhes/:id", (req, res) => {
  const id = Number(req.params.id);
  filme = listaFilmes.find((filme) => filme.id == id);
  res.redirect("/#cards");
});

app.post("/updated/:id", (req, res) => {
    mensagem = "";
    const id = +req.params.id -1;
    const novoFilme = req.body;
    novoFilme.id = id + 1;
    listaFilmes[id] = novoFilme;
    filme = undefined;
    res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
    const id = +req.params.id - 1;
    delete listaFilmes[id];
    res.redirect("/#card")
});

app.listen(port, () => {
  console.log(`Servidor rodando em ${port}`);
});
