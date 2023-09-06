import { SitemapStream, streamToPromise } from "sitemap";
import * as fs from "fs";
import { join, dirname } from "path";
import { Readable } from "stream";

const baseUrl = "https://www.jcmmetais.com.br"; // Replace with your website URL
const currentFilePath = new URL(import.meta.url).pathname;
const outputDir = join(dirname(currentFilePath.slice(1)), "dist//jcmfront2"); // Path to your Angular app's build output directory

const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/produtos", changefreq: "weekly", priority: 0.8 },
  { url: "/servicos", changefreq: "weekly", priority: 0.8 },
  { url: "/trabalhe", changefreq: "weekly", priority: 0.8 },
  { url: "/contato", changefreq: "weekly", priority: 0.8 },
  // Add more URLs as needed
];

const stream = new SitemapStream({ hostname: baseUrl });

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => data.toString())
  .then((sm) => {
    const outputPath = join(outputDir, "sitemap.xml");
    fs.writeFileSync(outputPath, sm);
    console.log(`Sitemap successfully generated and saved to ${outputPath}`);
  })
  .catch((error) => {
    console.error(`Error generating sitemap: ${error}`);
  });

const robotsTxt = `User-agent: *
Disallow: /login
Disallow: /home
`;

fs.writeFileSync(join(outputDir, "robots.txt"), robotsTxt);
