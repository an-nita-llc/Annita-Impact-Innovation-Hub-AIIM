import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3003;

// Serve static assets from Vite build output with caching for hashed assets
app.use(
  "/assets",
  express.static(path.join(__dirname, "dist", "assets"), {
    maxAge: "1y",
    immutable: true,
  }),
);

// If a requested asset file in /assets does not exist, return 404 instead of HTML fallback
app.use("/assets", (req, res) => {
  res.status(404).send("Asset not found");
});

// Serve general static files (favicons, manifest, images)
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback: Route all client page requests to index.html for React Router.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AIIM Hub production server running on port ${PORT}`);
});