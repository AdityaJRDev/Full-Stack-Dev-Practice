const express = require("express");
const app = express();

function requestLogger(req, res, next) {
  const currentTime = new Date();
  console.log(req.method);
  console.log(`${req.protocol}://${req.get("host")}${req.url}`);
  console.log(currentTime);
  next();
}

app.use(requestLogger);

app.get("*", (req, res) => {
  res.send("Hi there");
});

app.post("*", (req, res) => {
  res.send("Hello!");
});

app.delete("*", (req, res) => {
  res.send("Welcome!");
});

app.get("*", (req, res) => {
  res.send("Goodbye!");
});

app.listen(3000);
