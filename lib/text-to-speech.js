#!/usr/bin/env node

import fs from "fs";
import util from "util";
import textToSpeech from "@google-cloud/text-to-speech";

export async function convertTextToSpeech(string) {
  const client = new textToSpeech.TextToSpeechClient();

  async function getSpeech(string) {
    let text = string;
    let newArr = text.match(/[^\.]+\./g);

    let charCount = 0;
    let textChunk = "";
    let index = 0;

    for (var n = 0; n < newArr.length; n++) {
      charCount += newArr[n].length;
      textChunk = textChunk + newArr[n];

      // console.log(charCount);

      if (charCount > 4600 || n == newArr.length - 1) {
        // console.log(textChunk);
        // Construct the request
        const request = {
          input: {
            text: textChunk,
          },
          // Select the language and SSML voice gender (optional)
          voice: {
            languageCode: "en-US",
            ssmlGender: "MALE",
            name: "en-US-Wavenet-B",
          },
          // select the type of audio encoding
          audioConfig: {
            effectsProfileId: ["headphone-class-device"],
            pitch: -2,
            speakingRate: 1.3,
            audioEncoding: "MP3",
          },
        };

        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);

        // console.log(response);

        const randomNum = Math.floor(Math.random() * 10);

        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(
          "./audio/" + "audio" + (`${randomNum}` + index).slice(-4) + ".mp3",
          response.audioContent,
          "binary"
        );
        // console.log("Audio content written to file: output.mp3");

        index++;

        charCount = 0;
        textChunk = "";
      }
    }
  }
  getSpeech(string);
}
