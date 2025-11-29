const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const todosFilePath = path.join(__dirname, "todos-data.json");

const readTodosFromFile = () => {
  try {
    const data = fs.readFileSync(todosFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeTodosToFile = (data) => {
  fs.writeFileSync(todosFilePath, JSON.stringify(data, null, 2), "utf-8");
};

app.post("/todos/create", (req, res) => {
  const todo = req.body.todo;
  const id = parseInt(req.body.id);

  if (!id) {
    return res.send("Id cannot be empty");
  }

  let todos = readTodosFromFile();

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return res.send("Todo already exists with id " + id + ".");
    }
  }

  if (!todo || todo.trim() === "") {
    return res.send("Todos cannot be empty.");
  }

  const newTodo = {
    title: todo,
    id: id,
  };

  todos.push(newTodo);
  writeTodosToFile(todos);
  res.send("Todos were added successfully.");
});

app.delete("/todos/delete/all", (req, res) => {
  writeTodosToFile([]);
  res.send("All todos has been deleted.");
});

app.delete("/todos/delete/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  let todos = readTodosFromFile();
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
    return res.send("Todo does not match with the id.");
  }

  writeTodosToFile(tempTodos);
  res.send("Todo was deleted successfully.");
});

app.put("/todos/update/:id", (req, res) => {
  const { todo } = req.body;
  const todoId = parseInt(req.params.id);

  if (!todo || todo.trim() === "") {
    return res.send("Todo cannot be empty");
  }

  let todos = readTodosFromFile();
  let updated = false;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos[i].title = todo;
      updated = true;
    }
  }

  if (!updated) {
    return res.send("Todo was not updated with the id " + todoId + ".");
  }

  writeTodosToFile(todos);
  res.send("Todos was updated successfully");
});

app.get("/todos/read/all", (req, res) => {
  let todos = readTodosFromFile();

  if (todos.length === 0) {
    return res.send("Todos is empty");
  }

  res.send(todos);
});

app.get("/todos/read/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  let todos = readTodosFromFile();
  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo) {
    return res.send("Todo id was not found " + todoId + ".");
  }

  res.send(todo);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
