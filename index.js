const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const VIDEO_PATH = path.join(__dirname, "video.mp4"); // Change to your 4K video file

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/client.html"));
});

app.get("/video_4k", (req, res) => {
  const filePath = `./video_4k.mp4`;

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `attachment; filename="video.mp4"`);
    const stream = fs.createReadStream(filePath);
    return stream.pipe(res);
  }

  return res.status(404).send(`404 – File ${filePath} not found.`);
});

app.get("/video", (req, res) => {
  const filePath = `./video.mp4`;

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `attachment; filename="video.mp4"`);
    const stream = fs.createReadStream(filePath);
    return stream.pipe(res);
  }

  return res.status(404).send(`404 – File ${filePath} not found.`);
});

app.listen(PORT, () => {
  console.log(
    `✅ 4K Video Streaming Server running at: http://localhost:${PORT}/video`
  );
});
