const express = require("express");
const app = express();

app.get("/sum", (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  res.json({
    answer: a + b,
  });
});

app.post("/subtract", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.send({
    result: a - b,
  });
});

app.get("/multiply", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  res.json({
    answer: a * b,
  });
});

app.post("/divide", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.send({
    result: a / b,
  });
});

app.listen(3000);
