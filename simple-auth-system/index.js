const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "aditya1234";
const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
  console.log(`${req.method} req came`);
  next();
}

// serve static files from public folder
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/signup", logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({ username, password });

  res.json({
    message: "You are signed up",
  });
});

app.post("/signin", logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      foundUser = users[i];
      break;
    }
  }

  if (!foundUser) {
    res.json({
      message: "Credentials incorrect",
    });
    return;
  }

  const token = jwt.sign(
    {
      username: foundUser.username,
    },
    JWT_SECRET
  );

  res.header("jwt", token);
  res.header("random", "aditya");

  res.json({ token });
});

function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.json({ message: "Token is missing" });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.username = decodedData.username;
    next();
  } catch (error) {
    return res.json({ message: "Invalid Token" });
  }
}

app.get("/me", auth, function (req, res) {
  const currentUser = req.username;

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === currentUser) {
      foundUser = users[i];
      break;
    }
  }

  if (foundUser) {
    return res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    return res.json({
      message: "User not found!",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
