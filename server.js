const express = require("express");
const path = require("path");
const fs = require('fs');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const staticFilesDir = path.join(__dirname, "dist", "jcmfront2");

app.use('/', expressStaticGzip(staticFilesDir, {
  enableBrotli: true,
  orderPreference: ['br', 'gzip'], // Prefer Brotli over Gzip

}));

app.get('*', (req, res) => {
  switch (req.url.pathname) {
    case '/robots.txt':
      res.sendFile('robots.txt', { root: staticFilesDir });
      break;
    case '/Robots.txt':
      res.sendFile('robots.txt', { root: staticFilesDir });
      break;
    case '/sitemap.xml':
      res.sendFile('sitemap.xml', { root: staticFilesDir });
      break;
    default:
      res.sendFile('index.html', { root: staticFilesDir });
      break;
  }
});


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(`<h1>Internal Server Error</h1><p>${err}</p>`);
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
