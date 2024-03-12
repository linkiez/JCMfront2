const express = require("express");
const path = require("path");
const fs = require('fs');
const expressStaticGzip = require('express-static-gzip');
const https = require('https');
const app = express();
const staticFilesDir = path.join(__dirname, "dist", "jcmfront2");

// app.use(express.static(staticFilesDir));
app.use('/', expressStaticGzip(staticFilesDir, {
  enableBrotli: true,
  orderPreference: ['br', 'gzip'], // Prefer Brotli over Gzip
}));

app.get("/robots.txt", function (req, res) {
  res.sendFile("robots.txt", { root: staticFilesDir });
});

app.get("/sitemap.xml", function (req, res) {
  res.sendFile("sitemap.xml", { root: staticFilesDir });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(staticFilesDir, "index.html"));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(`<h1>Internal Server Error</h1><p>${err}</p>`);
});


app.listen(80, function () {
  console.log(`Server listening on port 80`);
});

// SSL certificate files
const privateKey = fs.readFileSync('ssl/jcmmetais.ddns.net-PrivateKey.key', 'utf8');
const certificate = fs.readFileSync('ssl/jcmmetais_ddns_net.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log('HTTPS server running on port 443');
});
