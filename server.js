import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3003;

// Serve static assets from Vite build output
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback: Route all client requests to index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AIIM Hub production server running on port ${PORT}`);
});
