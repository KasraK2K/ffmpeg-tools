"use strict";
exports.__esModule = true;
exports.snapshot = void 0;
var ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
var ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpeg_1.path);
/**
 * @param {*} videoPath: Input video file string path
 * @param {*} folder: Destination folder to save snapshot
 * @param {*} filename: Snapshot image name
 * @param {*} times: Seconds to take snapshot
 * @param {number} [count=1]: The number of snapshot should to create
 * @return {*}
 */
var snapshot = function (videoPath, folder, filename, times, count) {
    if (count === void 0) { count = 1; }
    return new ffmpeg(videoPath).noAudio().takeScreenshots({
        count: count,
        timemarks: typeof times === "number" ? [times] : times,
        filename: filename
    }, folder);
};
exports.snapshot = snapshot;
