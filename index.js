const express = require("express");
const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const VIDEO_PATH = path.join(__dirname, "video.mp4"); // Change to your 4K video file

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

const filePath = `./measure.json`;
// create a new file or clear the file if it exists
fs.writeFileSync(filePath, "[]");

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

const saveMeasureToFile = (measure) => {
  const filePath = `./measure.json`;
  try {
    let json = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      json = JSON.parse(data || "[]");
    }
    json.push(measure);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  } catch (error) {
    console.error("Error saving measurements:", error);
  }
};

app.post("/measure", (req, res) => {
  saveMeasureToFile(req.body);
  res.send("ok");
});

app.get("/measure", (req, res) => {
  const filePath = `./measure.json`;
  const data = fs.readFileSync(filePath, "utf8");
  res.send(data);
});

app.listen(PORT, () => {
  console.log(
    `✅ 4K Video Streaming Server running at: http://localhost:${PORT}/video`
  );
});
