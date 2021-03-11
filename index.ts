import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import * as ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);
import { join } from "path";

/**
 * @param {*} videoPath : Input video file string path
 * @param {*} folder : Destination folder to save snapshot
 * @param {*} filename : Snapshot image name
 * @param {*} times : Seconds to take snapshot
 * @param {number} [count=1] : The number of snapshot should to create
 * @return {*}
 */
export const snapshot = (
  videoPath: string,
  folder: string,
  filename: string,
  times: number | number[],
  count: number = 1
) => {
  return new ffmpeg(videoPath).noAudio().takeScreenshots(
    {
      count,
      timemarks: typeof times === "number" ? [times] : times,
      filename,
    },
    folder
  );
};

/**
 * @param {*} video : Selected Video to place watermark on it
 * @param {*} watermark : Object like { dir: string; icon: string } to find watermark picture
 * @param {*} destination : Destination folder to save watermarked video
 * @param {*} overlay : Position of watermark like (W-w)-20:(H-h)-40
 * @return {*}
 */
export const watermark = (
  video: string,
  watermark: { dir: string; icon: string },
  destination: string,
  overlay: string = "(W-w)-20:(H-h)-40"
) => {
  const iconPath = join(watermark.dir, watermark.icon);
  return new ffmpeg({ source: video })
    .addOption(
      "-vf",
      `movie=${iconPath} [watermark]; [in] [watermark] overlay=${overlay} [out]`
    )
    .on("start", function (commandLine) {
      console.log(commandLine);
    })
    .on("progress", function (progress) {
      console.log(progress.timemark);
    })
    .on("error", function (err, stdout, stderr) {
      console.log("ERROR: " + err.message);
      console.log("STDERR:" + stderr);
    })
    .on("end", function () {
      console.log("DONE");
    })
    .saveToFile(destination);
};
