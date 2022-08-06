import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import process from "process";
import { getAudioDurationInSeconds } from "get-audio-duration";

export async function addAudio(title) {
  let audio = `${process.cwd()}/audio/${title}.mp3`;
  let image = `${process.cwd()}/screenshots/${title}.png`;

  new Promise((resolve, reject) => {
    ffmpeg()
      .addInput(image) //your image file input path
      .inputFormat("png")
      .addInput(audio) //your audio file input path
      .inputFormat("mp3")
      .outputOptions(["-map 0:v", "-map 1:a", "-c:v copy", "-shortest"])
      .on("error", reject)
      .on("end", resolve)
      .save(`${process.cwd()}/lib/edit-video/temp/${title}.mp4`);
  });

  //   let video = `${process.cwd()}/videos/${title}.mov`;
  //   console.log(video);

  //   // await createFile(title, video);
  //   // console.log("created video for ", `${title}`);

  //   let audio = `audio/${title}.mp3`;
  //   let length;
  //   getAudioDurationInSeconds(audio).then((duration) => {
  //     length = duration;
  //   });

  //   let output = `${process.cwd()}/lib/edit-video/temp/${title}both.mov`;

  //   ffmpeg()
  //     .addInput(video)
  //     .inputFormat("mov")
  //     .addInput(audio)
  //     .inputFormat("mp3")
  //     .output(output)
  //     .outputOptions(["-map 0:v", "-map 1:a", "-c:v copy", "-shortest"])
  //     .saveToFile(`${process.cwd()}/lib/edit-video/temp/${title}both.mov`)
  //     .on("error", function (err, stdout, stderr) {
  //       console.log("an error occured:" + err.message + stderr);
  //     });
  // }

  // async function createFile(title, video) {
  //   fs.writeFile(
  //     `${process.cwd()}/lib/edit-video/temp/${title}both.mov`,
  //     video,
  //     function (err, data) {
  //       if (err) console.log("error: couldn't write file", err);
  //     }
  //   );
}
