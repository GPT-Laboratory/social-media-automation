const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const cors = require("cors");


const app = express();
app.use(cors());

// Create folders if not exist
["uploads", "merged"].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Merge endpoint
app.post("/merge", upload.fields([{ name: "video" }, { name: "audio" }]), (req, res) => {
    if (!req.files.video || !req.files.audio) {
        return res.status(400).json({ error: "Both video and audio files are required" });
    }

    const videoPath = req.files.video[0].path;
    const audioPath = req.files.audio[0].path;
    const outputFile = `merged/${Date.now()}-merged.mp4`;

    ffmpeg()
        .input(videoPath)
        .input(audioPath)
        .outputOptions(["-c:v copy", "-c:a aac", "-strict experimental"])
        .save(outputFile)
        .on("end", () => {
            res.download(outputFile, (err) => {
                if (err) console.error(err);
                // Optional cleanup
                fs.unlinkSync(videoPath);
                fs.unlinkSync(audioPath);
                // Keep output file for debugging
            });
        })
        .on("error", (err) => {
            console.error("FFmpeg error:", err);
            res.status(500).json({ error: "Merging failed" });
        });
});

app.get("/", (req, res) => {
    res.send("Audio-Video Merge API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
