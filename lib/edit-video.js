import fs from "fs";
import util from "util";
import { imageToVideo } from "./image-to-video.js";

export async function editVideo(fileNames) {
  async function convertScreenshots(fileNames) {
    // console.log(fileNames);
    for (let i = 0; i < fileNames.length; i++) {
      // fs.writeFileSync(`./videos/${fileNames[i]}.mov`, "placeholder", (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      // });
      await imageToVideo(fileNames[i]);
    }
  }

  await convertScreenshots(fileNames);
}
