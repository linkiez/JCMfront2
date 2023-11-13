const express = require("express");
const path = require("path");
const fs = require('fs');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const staticFilesDir = path.join(__dirname, "dist", "jcmfront2");

// app.use(express.static(staticFilesDir));
const robot =
`User-agent: *
Disallow: /login
Disallow: /home`

app.get("/Robots.txt", function (req, res) {
  res.send(robot);
});

app.get("/robots.txt", function (req, res) {
  res.send(robot);
});

app.get("/sitemap.xml", function (req, res) {
  res.sendFile("sitemap.xml", { root: staticFilesDir });
});

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(staticFilesDir, "index.html"));
// });

app.use('/', expressStaticGzip(staticFilesDir, {
  enableBrotli: true,
  orderPreference: ['br', 'gzip'], // Prefer Brotli over Gzip

}));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: staticFilesDir });
});


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(`<h1>Internal Server Error</h1><p>${err}</p>`);
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
