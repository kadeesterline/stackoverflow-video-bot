import fs from "fs";
import util from "util";
import { imageToVideo } from "./image-to-video.js";
import { addAudio } from "./add-audio.js";

export async function editVideo(fileNames) {
  async function convertScreenshots(fileNames) {
    // console.log(fileNames);
    async function convertType() {
      for (let i = 0; i < fileNames.length; i++) {
        await imageToVideo(fileNames[i]);
      }
    }

    async function combineAudioAndVideo() {
      for (let i = 0; i < fileNames.length; i++) {
        await addAudio(fileNames[i]);
      }
    }

    await convertType();
    await combineAudioAndVideo();
  }

  await convertScreenshots(fileNames);
}
