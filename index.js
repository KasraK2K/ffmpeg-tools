const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const command = ffmpeg();

const videoToImage = (videoPath, folder, filename, times, count = 1) => {
  command.input(videoPath).takeScreenshots({
    count,
    folder,
    filename,
    timemarks: typeof times === "number" ? [times] : times,
  });
};

module.exports.videoToImage = videoToImage;
