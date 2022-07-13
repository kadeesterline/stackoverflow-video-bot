#!/usr/bin/env node

import ytdl from "ytdl-core";
import fs from "fs";

export async function downloadVideo(videoURL) {
  let url = videoURL;
  function startDownload() {
    ytdl(url).pipe(fs.createWriteStream("./videos/background.webm"));
  }

  startDownload();
}
