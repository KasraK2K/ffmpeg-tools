"use strict";
exports.__esModule = true;
exports.watermark = exports.snapshot = void 0;
var ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
var ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpeg_1.path);
/**
 * @param {*} videoPath : Input video file string path
 * @param {*} folder : Destination folder to save snapshot
 * @param {*} filename : Snapshot image name
 * @param {*} times : Seconds to take snapshot
 * @param {number} [count=1] : The number of snapshot should to create
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
/**
 * @param {*} video : Selected Video to place watermark on it
 * @param {*} watermark : Object like { dir: string; icon: string } to find watermark picture
 * @param {*} destination : Destination folder to save watermarked video
 * @param {*} overlay : Position of watermark like (W-w)-20:(H-h)-40
 * @return {*}
 */
var watermark = function (video, watermark, destination, overlay) {
    if (overlay === void 0) { overlay = "(W-w)-20:(H-h)-40"; }
    return new ffmpeg({ source: video })
        .addOption("-vf", "movie=" + watermark + " [watermark]; [in] [watermark] overlay=" + overlay + " [out]")
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
exports.watermark = watermark;
