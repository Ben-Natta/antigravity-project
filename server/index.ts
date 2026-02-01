import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db";
import * as schema from "../shared/schema";
import { desc, eq } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.use(express.json());

  // API Routes
  app.get("/api/categories", async (_req, res) => {
    console.log("GET /api/categories - Fetching from DB...");
    try {
      const allCategories = await db.select().from(schema.categories);
      console.log(`GET /api/categories - Found ${allCategories.length} categories`);
      res.json(allCategories);
    } catch (error) {
      console.error("GET /api/categories Error:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/news", async (_req, res) => {
    console.log("GET /api/news - Fetching from DB...");
    try {
      const allNews = await db.select().from(schema.news).orderBy(desc(schema.news.publishedAt));
      console.log(`GET /api/news - Found ${allNews.length} articles`);
      res.json(allNews);
    } catch (error) {
      console.error("GET /api/news Error:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`GET /api/news/${id} - Fetching from DB...`);
    try {
      const article = await db.select().from(schema.news).where(eq(schema.news.id, id)).limit(1);
      if (article.length === 0) {
        console.log(`GET /api/news/${id} - Not found`);
        return res.status(404).json({ error: "News not found" });
      }
      console.log(`GET /api/news/${id} - Found article:`, article[0].title);
      res.json(article[0]);
    } catch (error) {
      console.error(`GET /api/news/${id} Error:`, error);
      res.status(500).json({ error: "Failed to fetch news article" });
    }
  });

  // Sitemap Route
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = `https://${req.get('host')}` || "https://esther-clinic.com";
      const newsItems = await db.select().from(schema.news);

      const staticPages = ["", "news", "services", "contact"];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      // Add static pages
      staticPages.forEach(page => {
        xml += `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
      });

      // Add news items
      newsItems.forEach(item => {
        xml += `
  <url>
    <loc>${baseUrl}/news/${item.id}</loc>
    <lastmod>${new Date(item.publishedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });

      xml += `
</urlset>`;

      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (error) {
      console.error("Sitemap Error:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Handle client-side routing - serve index.html for all routes
  if (process.env.NODE_ENV === "production") {
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
