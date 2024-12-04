import { v4 as uuid } from "uuid";
const express = require("express");
const multer = require("multer");
var ffmpeg = require("ffmpeg");
const app = express();
const port = 9000;

app.get("/", (req, res) => {
  res.send("hello 1001 :D");
});

let videos = [];

const upload = multer({ dest: "./uploads" });

function bytesToMegaBytes(bytes) {
  return bytes / (1024 * 1024);
}

app.post("/videos", upload.single("video"), (req, res) => {
  if (req.file || req.body.title !== "") {
    const videoID = uuid();
    const videoDetails = {
      id: videoID,
      title: req.body.title,
      description: req.body.description,
      fileSize: bytesToMegaBytes(req.file.size).toFixed(2),
      uploadDate: new Date().toLocaleString(),
    };
    videos.push(videoDetails);
    res.status(201).json({
      message: "Video uploaded successfully!",
      videoID: videoID,
    });
  } else {
    res.status(400).json({
      message: "Video file, or title not found",
    });
  }
});

app.get("/videos/:id", (req, res) => {
  var result = videos.find((video) => video.id === req.params.id);
  if (result) {
    res.status(200).json({
      video: result,
    });
  } else {
    res.status(404).json({
      message: "Video not found",
    });
  }
});

app.get("/videos", (req, res) => {
  var pageSize = parseInt(req.query.pageSize);
  var pageNum = parseInt(req.query.pageNum);
  var startIndex = (pageNum - 1) * pageSize;
  var endIndex = startIndex + pageSize;
  res.status(200).json({
    videos: videos.slice(startIndex, endIndex),
    count: videos.length,
  });
});

app.delete("/videos/:id", (req, res) => {
  var result = videos.find((video) => video.id === req.params.id);
  if (result) {
    videos = videos.filter((video) => video.id !== req.params.id);
    res.status(202).json({
      message: "Video deleted successfully",
    });
  } else {
    res.status(400).json({
      message: "Video not found",
    });
  }
});

app.listen(port, () => {
  console.log("listening to localhost:%d", port);
});
