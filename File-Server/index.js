const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const fileDir = path.join(__dirname, "./files/");

app.get("/files", (req, res) => {
  fs.readdir(fileDir, (err, files) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to retrieve files",
      });
    }
    res.json(files);
  });
});

app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(fileDir, filename);

  fs.readdir(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "File not found" });
    }
    res.send(data);
  });
});

app.listen(3000);
