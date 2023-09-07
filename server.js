const express = require("express");
const path = require("path");

const app = express();
const staticFilesDir = path.join(__dirname, "dist", "jcmfront2");

app.use(express.static(staticFilesDir));

app.get("/robots.txt", function (req, res) {
  res.sendFile(path.join(staticFilesDir, "robots.txt"));
});

app.get("/sitemap.xml", function (req, res) {
  res.sendFile(path.join(staticFilesDir, "sitemap.xml"));
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(staticFilesDir, "index.html"));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
