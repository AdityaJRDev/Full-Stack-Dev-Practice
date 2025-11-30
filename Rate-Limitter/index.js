const express = require("express");
const app = express();

let numberOfRequests = {};

setInterval(() => {
  numberOfRequests = {};
}, 1000);

app.use((req, res, next) => {
  const userId = req.header["user-id"];

  if (!userId) {
    return res.send(400).send("User ID required");
  }

  if (!numberOfRequests[userId]) {
    numberOfRequests[userId] = 1;
    return next();
  }

  numberOfRequests[userId]++;

  if (numberOfRequests[userId] > 5) {
    return res.status(404).send("No Entry!");
  }

  next();
});

app.get("/user", function (req, res) {
  res.status(200).json({ name: "Bharath" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "Created Dummy User" });
});

app.listen(3000);
