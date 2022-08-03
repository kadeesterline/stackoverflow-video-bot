import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import process from "process";
import { getAudioDurationInSeconds } from "get-audio-duration";

export async function addAudio(title) {
  let video = `${process.cwd()}/videos/${title}.mov`;

  fs.writeFile(`/temp/${title}both.mov`, video, function (err, data) {
    if (err) console.log("error: couldn't write file", err);
  });

  let audio = `audio/${title}.mp3`;
  let length;
  getAudioDurationInSeconds(audio).then((duration) => {
    length = duration;
  });

  let output = `${process.cwd()}/lib/edit-video/temp/${title}.webm`;

  ffmpeg()
    .addInput(video)
    .inputFormat("webm")
    .addInput(audio)
    .inputFormat("mp3")
    .output(output)
    .outputOptions(["-map 0:v", "-map 1:a", "-c:v copy", "-shortest"])
    .saveToFile(`${process.cwd()}/lib/edit-video/temp/${title}both.mov`);
}
