import process from "process";
import express from "express";
import path from "path";
import prerender from "prerender-node";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SEO prerender
app.use(prerender);

// Static files
app.use(express.static(path.join(__dirname, "dist")));

// robots & sitemap
app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "robots.txt"));
});

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "sitemap.xml"));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});