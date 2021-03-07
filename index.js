const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const videoToImage = (videoPath, folder, filename, times, count = 1) => {
  return new ffmpeg(videoPath).noAudio().takeScreenshots(
    {
      count,
      timemarks: typeof times === "number" ? [times] : times,
      filename,
    },
    folder
  );
};

module.exports.videoToImage = videoToImage;
