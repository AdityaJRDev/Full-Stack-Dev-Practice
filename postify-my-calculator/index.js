const express = require("express");
const app = express();

app.use(express.json());

app.post("/sum", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.send({
    answer: a + b,
  });
});

app.post("/multiply", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.send({
    answer: a * b,
  });
});

app.post("/subtract", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.send({
    answer: a - b,
  });
});

app.post("/divide", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.send({
    answer: a / b,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
