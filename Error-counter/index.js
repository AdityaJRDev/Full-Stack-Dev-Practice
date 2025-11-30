const express = require("express");
const app = express();

let errorCount = 0;

app.get("/user", (req, res) => {
  throw new Error("Some Error");
  res.status(200).json({ name: "John" });
});

app.post("/user", (req, res) => {
  res.status(200).json({ msg: "Created dummy user" });
});

app.get("/user", (req, res) => {
  res.status(200).json({ errorCount });
});

app.use((err, req, res, next) => {
  res.status(404).send({});
  errorCount++;
});

app.listen(3000);
