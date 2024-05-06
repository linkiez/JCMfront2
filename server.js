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

const httpsServer = null;

if (
  fs.existsSync("./ssl/jcmmetais.ddns.net-PrivateKey.key") &&
  fs.existsSync("./ssl/jcmmetais.ddns.net-cloudflare.pem")
) {
  httpsServer = https.createServer({
    key: fs.readFileSync("./ssl/jcmmetais.ddns.net-PrivateKey.key"),
    cert: fs.readFileSync("./ssl/jcmmetais.ddns.net-cloudflare.pem"),
  }, app);
  httpsServer.keepAliveTimeout = 60 * 1000 + 1000;
  httpsServer.headersTimeout = 60 * 1000 + 2000;

  httpsServer.listen(443, () => {
    console.log('HTTPS server running on port 443');
  })
}


