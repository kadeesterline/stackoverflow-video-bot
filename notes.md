# Notes for Stackoverflow Video Bot

Technologies used/needed

- Node-Fetch: used for making fetches from a node app
- Mocha: used for writing tests for the program
- Puppeteer: used to generate screenshots from stackover flow questions
- Sharp: used for image processing if needed
- EtroJS: used to stitch together audio, pictures and video
- node-ytdl-core: used to download background videos
- say: used to convert text to audio file

Needed:

- [x] text to speech: could use an api or library(build with different language??) - RedditToVideo uses a google python library
- [x] way to get minecraft backgrounds - RedditToVideo uses youtube videos
- [x] way to stitch together text to speech with video & screenshots - RedditToVideo uses moviepy python library - Remotion uses - react? - etrojs is more like using iMovie with JavaScript

## Structure of app

1. /lib
   - contains modules built to execute individual tasks(think grabbing screenshots or downloading the youtube video)
2. /screenshots
   - contains the screenshot images taken by puppeteer
3. /test
   - contains mocha test scripts to test apps functionality
4. index.js
   - contains the logic to start program. Greets user, takes in inputs and makes function calls to modules imported from /lib

## To do
