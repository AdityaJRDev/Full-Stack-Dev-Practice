const express = require("express");
const app = express();
app.use(express.json());

let todos = [];

app.post("/todos/create", (req, res) => {
  const { todo } = req.body;
  const id = parseInt(req.body.id);

  if (!id) {
    return res.send("Todo cannot be empty.");
  }

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return res.send("Todos cannot be same");
    }
  }

  if (!todo || todo.trim() === "") {
    return res.send("Todo cannot be empty");
  }

  const newTodo = {
    title: todo,
    id: id,
  };

  todos.push(newTodo);
  res.send("Todos added successfully");
});

app.delete("/todos/delete/all", (req, res) => {
  todos = [];
  res.send("All todos has been deleted");
});

app.delete("/todos/delete/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  let deleted = false;
  const tempTodos = [];

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      deleted = true;
      continue;
    }
    tempTodos.push(todos[i]);
  }

  if (!deleted) {
    return res.send("Todo not found with the id " + todoId);
  }

  todos = tempTodos;
  res.send("Todo was successfully deleted with the id " + todoId);
});

app.put("/todos/update/:id", (req, res) => {
  const { todo } = req.body;
  const todoId = parseInt(req.params.id);

  if (!todo || todo.trim() === "") {
    return res.send("Todo was not found with the id " + todoId);
  }

  let updated = false;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos[i].title = todo;
      updated = true;
    }
  }

  if (!updated) {
    return res.send("Todo cannot be updated with the id " + todoId);
  }

  res.send("Todo was updated successfully with the id " + todoId);
});

app.get("/todos/read/all", (req, res) => {
  if (todos.length === 0) {
    return res.send("No todos were found!");
  }

  res.send(todos);
});

app.get("/todos/read/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo) {
    return res.send("Todo was not found withe the id " + todoId);
  }

  res.send(todo);
});

app.listen(3000, () => {
  console.log("Server running on port 3000 !");
});
