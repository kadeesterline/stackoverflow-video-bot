import fs from "fs";
import util from "util";
import { imageToVideo } from "./image-to-video.js";
import { addAudio } from "./add-audio.js";

export async function editVideo(fileNames) {
  // console.log(fileNames);
  async function convertScreenshots(fileNames) {
    // console.log(fileNames);
    // async function convertType(fileNames) {
    //   for (let i = 0; i < fileNames.length; i++) {
    //     console.log(`${i}`, fileNames[i]);
    //     await imageToVideo(fileNames[i]);
    //   }
    // }

    async function combineAudioAndVideo(fileNames) {
      for (let i = 0; i < fileNames.length; i++) {
        await addAudio(fileNames[i]);
      }
    }

    // await convertType(fileNames);
    await combineAudioAndVideo(fileNames);
  }

  await convertScreenshots(fileNames);
}
