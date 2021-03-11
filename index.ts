import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import * as ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * @param {*} videoPath: Input video file string path
 * @param {*} folder: Destination folder to save snapshot
 * @param {*} filename: Snapshot image name
 * @param {*} times: Seconds to take snapshot
 * @param {number} [count=1]: The number of snapshot should to create
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
