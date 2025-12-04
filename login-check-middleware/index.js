const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "randomadityaihatereligion";
app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((user) => user.username === username)) {
    res.json({
      message: "You are already signedup",
    });
    return;
  }

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You are signed in",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    //user.token = token;
    res.json({
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

// app.get("/me", (req, res) => {
//   const token = req.headers.token;
//   const decodedInformation = jwt.verify(token, JWT_SECRET);
//   const username = decodedInformation.username;
//   let foundUser = null;

//   for (let i = 0; i < users.length; i++) {
//     if (users[i].username == username) {
//       foundUser = users[i];
//     }
//   }

//   if (foundUser) {
//     res.json({
//       username: foundUser.username,
//       password: foundUser.password,
//     });
//   } else {
//     res.json({
//       message: "Token invalid",
//     });
//   }
// });

function auth(req, res, next) {
  const token = res.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

app.get("/me", auth, (req, res) => {
  const user = req.user;

  res.send({
    username: user.username,
  });
});

app.listen(3000);
