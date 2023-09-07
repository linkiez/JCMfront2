const express = require("express");
const path = require("path");

const app = express();
const staticFilesDir = path.join(__dirname, "dist", "jcmfront2");

app.use(express.static(staticFilesDir));

app.get("/robots.txt", function (req, res) {
  res.sendFile("robots.txt", { root: staticFilesDir });
});

app.get("/sitemap.xml", function (req, res) {
  res.sendFile("sitemap.xml", { root: staticFilesDir });
});

app.get('/list-files', (req, res) => {
  fs.readdir(staticFilesDir, (err, files) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(files);
  });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(staticFilesDir, "index.html"));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(`<h1>Internal Server Error</h1><p>${err}</p>`);
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
