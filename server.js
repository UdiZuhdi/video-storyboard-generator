const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

// API Routes
app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "Video Storyboard Generator",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        deployment: {
            strategy: "dual",
            platforms: ["vercel", "github-pages"],
            primary: "vercel"
        }
    });
});

app.get("/api/storyboard", (req, res) => {
    res.json({
        endpoint: "/api/storyboard",
        description: "Generate video storyboards using AI",
        method: "POST",
        required_parameters: ["video_url", "frame_count"],
        optional_parameters: ["style", "output_format"],
        example_request: {
            video_url: "https://example.com/video.mp4",
            frame_count: 10,
            style: "professional",
            output_format: "pdf"
        }
    });
});

app.get("/api/status", (req, res) => {
    res.json({
        server: "running",
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        platform: process.platform,
        node_version: process.version
    });
});

// Root route - redirect to frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log("=" .repeat(60));
    console.log("🚀 VIDEO STORYBOARD GENERATOR");
    console.log("=" .repeat(60));
    console.log(`📁 Frontend: http://localhost:${PORT}`);
    console.log(`🔧 API Health: http://localhost:${PORT}/api/health`);
    console.log(`🔧 API Status: http://localhost:${PORT}/api/status`);
    console.log("=" .repeat(60));
    console.log("Deployment Strategy:");
    console.log("   ✅ Vercel - Primary deployment");
    console.log("   ✅ GitHub Pages - Backup deployment");
    console.log("=" .repeat(60));
    console.log("Press Ctrl+C to stop the server");
});
