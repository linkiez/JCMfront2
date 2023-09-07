const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname + "/dist/jcmfront2"));
app.get("/Robots.txt", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/jcmfront2/robots.txt"));
});
app.get("/robots.txt", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/jcmfront2/robots.txt"));
});
app.get("/sitemap.xml", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/jcmfront2/sitemap.xml"));
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/jcmfront2/index.html"));
});
app.listen(process.env.PORT || 8080);
