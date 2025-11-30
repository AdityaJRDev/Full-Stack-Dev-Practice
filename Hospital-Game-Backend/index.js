const express = require("express");
const app = express();

app.use(express.json());

let users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  const numberOfHealthyKidneys = johnKidneys.filter((kidney) => kidney.healthy);
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;

  users[0].kidneys.push({
    kidneys: isHealthy,
  });

  res.json({
    message: "Kidney added successfully!",
  });
});

app.put("/", (req, res) => {
  if (isThereAtleastOneUnhealthyKidney) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      users[0].kidneys.healthy = true;
    }

    res.json({
      message: "Kidneys have been replaced successfully!",
    });
  } else {
    res.status(411).json({
      message: "You have no unhealthy kidney to replace",
    });
  }
});

app.delete("/", (req, res) => {
  if (isThereAtleastOneUnhealthyKidney) {
    const newKidneys = [];

    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys.healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }

    users[0].kidneys = newKidneys;

    res.json({
      message: "You have removed unhealthy kidneys",
    });
  } else {
    res.json({
      message: "You have no unhealthy kidneys to remove",
    });
  }
});

function isThereAtleastOneUnhealthyKidney() {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys.healthy) {
      return true;
    }
  }
  return false;
}

app.listen(3000);
