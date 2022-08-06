#!/usr/bin/env node

import ffmpeg from "fluent-ffmpeg";

export async function imageToVideo(title) {
  let proc = ffmpeg(`screenshots/${title}.png`)
    .loop(5)
    .fps(25)
    .on("end", function () {
      // console.log("file has been converted succesfully");
    })
    .on("error", function (err) {
      console.log("an error happened: " + err.message, err);
    })
    .save(`videos/${title}.mov`);

  // console.log("created video: ", `${title}.webm`);
}
