const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  repositories.push({id: uuid(), title:title, url:url,techs:techs, likes:0})
  return response.json({message : "cadastrado com sucesso"})
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;

  const {title, url, techs} = request.body

  const repositorie = repositories.find(repositorie => repositorie.id == id)

  if(!repositorie) {
    return response.status(400).json({error: "repositorio nao encontrado"})
  } else {
    repositorie.title = title;
    repositorie.url = url;
    repositorie.techs = techs;

    return response.json(repositorie)
  }
  
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositorieIndex < 0) {
    return response.status(400).json({error: "repositorio não encontrado"})

  } else {
    repositories.splice(repositorieIndex, 1);
    return response.status(204).json('')
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;

  const repositorie = repositories.find(repositorie => repositorie.id == id);
  if(!repositorie) {
    return response.status(400).json({error: "repositorio nao encontrado"})
  } else {
    repositorie.likes += 1;
    return response.json(repositorie);
  }
  
});

module.exports = app;
