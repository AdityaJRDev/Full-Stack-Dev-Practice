const express = require("express");
const app = express();

let requestCount = 0;

app.use((req, res, next) => {
  requestCount = requestCount + 1;
  next();
});

app.get("/user", (req, res) => {
  res.status(200).json({ name: "Aditya" });
});

app.post("/user", (req, res) => {
  res.status(200).json({ message: "Created a dummy user" });
});

app.get("/requestCount", (req, res) => {
  res.status(200).json({ requestCount });
});

app.listen(3000);
