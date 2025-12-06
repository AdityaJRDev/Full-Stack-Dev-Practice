const express = require("express");
const { UserModel, TodoModel } = require("./db");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "ihatereligion";

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://jraditya_db_user:jhPBy26PG4JJH2xq@cluster0.fxnhwht.mongodb.net/todo-aditya-2222"
);

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    username: username,
    password: password,
    name: name,
  });

  res.json({
    message: "You are logged in",
  });
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await UserModel.findOne({
    username: username,
    password: password,
  });

  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

app.post("/todo", auth, (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: "todo created",
  });
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  res.json({
    todos,
  });
});

function auth(req, res, next) {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
}

app.listen(3000);
