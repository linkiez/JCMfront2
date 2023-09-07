const express = require("express");
const path = require("path");

const app = express();
const staticFilesDir = path.join(__dirname, "dist", "jcmfront2");

const sitemap = app.use(express.static(staticFilesDir));

app.get("/robots.txt", function (req, res) {
  res.send(`User-agent: *
  Disallow: /login
  Disallow: /home
  `);
});

app.get("/sitemap.xml", function (req, res) {
  res.send(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"><url><loc>https://www.jcmmetais.com.br/</loc><changefreq>daily</changefreq><priority>1.0</priority></url><url><loc>https://www.jcmmetais.com.br/produtos</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>https://www.jcmmetais.com.br/servicos</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>https://www.jcmmetais.com.br/trabalhe</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>https://www.jcmmetais.com.br/contato</loc><changefreq>weekly</changefreq><priority>0.8</priority></url></urlset>'
  );
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
