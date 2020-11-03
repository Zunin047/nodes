const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const repository = {
    id:uuid(),
    title,url,techs,
    likes:0,
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {title,url,techs} = request.body
  const {id} = request.params
  const repositoriesId = repositories.findIndex(repository => repository.id == id);

  if (repositoriesId == -1){
    return response.status(400).json({error:'Does not exists'})
  }

  const repository= {
    id,title,url,techs, likes: repositories[repositoriesId].likes,
  }
  repositories[repositoriesId] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoriesId = repositories.findIndex(repository => repository.id == id);
  if(repositoriesId >=0){
    repositories.splice(repositoriesId,1)
  }else{
    response.status(400).json({error:'Does not exists'})
  }
  return response.status(204).send()


});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repositoriesId = repositories.findIndex(repository => repository.id == id);

  if (repositoriesId == -1){
    return response.status(400).json({error:'Does not exists'})
  }

  repositories[repositoriesId].likes+=1
  return response.json( repositories[repositoriesId])

});

module.exports = app;
