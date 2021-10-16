const express = require('express');
const { urlencoded, json } = require('body-parser');
const port = 9000;
const app = express();

var todos = [{id:1, title:'buy the milk'}, {id:2, title:'rent a car'}, {id:3, title:'feed the cat'}];

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json())

app.get('/', (_, response) => response.status(200).json(todos));

app.post('/', (request, response) => {
  var newTodo = { id: -1, title: request.body.title }
  newTodo.id = new Date().getTime();
  todos.push(newTodo);
  response.status(201).json(newTodo);
});

app.put('/:id', (request, response) => {
  const reqId = request.params.id;
  const todoIndex = todos.findIndex(({ id }) => id === Number(reqId));

  if (todoIndex > -1){
    const updatedTodo = request.body;
    todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
    response.status(204).send();
  } else {
    response.status(404, 'The task is not found').send();
  }
});

app.delete('/:id', (request, response) => {
  const reqId = request.params.id;
  const todoIndex = todos.findIndex(({ id }) => id === Number(reqId));

  if (todoIndex === -1) {
    response.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    response.status(200).send();
  }
})

app.listen(process.env.PORT || port);