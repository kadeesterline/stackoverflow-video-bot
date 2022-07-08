#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { screenshot } from "./lib/screenshot.js";
import { makeApiCall } from "./lib/api-call.js";
import { downloadVideo } from "./lib/download-video.js";
import { convertTextToSpeech } from "./lib/text-to-speech.js";

// sleep is used to add a bit of delay to function calls if needed
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// * Global variables
let questionURL = "";
let videoURL = "";
let questionDataObj = {
  textString: "",
  isAnswered: false,
  answerCount: 0,
  htmlString: "",
  answerIds: [],
};
let plainTextStrings = {
  strings: [],
};

// * welcome function used at start of program, prints title and description
async function welcome() {
  const greeting = chalk.green("STACKOVERFLOW VIDEO CREATOR");
  console.log(greeting);
  const message = chalk.green(`
This tool will allow you to input a stackoverflow url and a background video url 
and spit out a video of the question being read as well as the answers to the 
questions.
`);
  console.log(message);
}

/**
 *    prompts user input for question url
 *    sets questionURL variable equal to user input
 */
async function getQuestionURL() {
  const answer = await inquirer.prompt({
    name: "questionURL",
    type: "input",
    message: "Enter the stackoverflow questions URL:",
  });
  questionURL = answer.questionURL;
}

/**
 *    prompts user input for video url
 *    sets videoURL variable equal to user input
 */
async function getVideoURL() {
  const answer = await inquirer.prompt({
    name: "videoURL",
    type: "input",
    message: "Enter the youtube background videos URL:",
  });
  videoURL = answer.videoURL;
}

/**
 * prompts user to confirm the two URLs given are accurate
 * if confirmed, the video editing process begins
 */
async function confirmStart() {
  let styledQuestion = chalk.bgGreen(`${questionURL}`);
  let styledVideo = chalk.bgGreen(`${videoURL}`);

  const answer = await inquirer.prompt({
    name: "answer",
    type: "input",
    message: `Your question is ${styledQuestion} and your video is ${styledVideo}.

If these look correct, enter y (case sensitive). If you need to start over, press any other key`,
  });

  if (answer.answer == "y") {
    startVideoEdit();
  } else {
    startOver();
  }
}

/**
 * prints confirmation that process has begun
 * calls X function to utilize puppeteer and grab screenshots
 * calls X function to utilize say to generate text to speech
 * calls X function to utilize ytdl to download background video
 * calls X function to utilize etro to stitch together video
 */
async function startVideoEdit() {
  console.log("Starting Video Edit, this might take a while");
  await sleep();

  // * gets question data from API, converts question html and answer html to plain text string
  console.log("Grabbing question data from stackoverflow");
  console.log("");
  await makeApiCall(questionURL, questionDataObj, plainTextStrings);
  await sleep();

  // if (questionDataObj.isAnswered == true) {
  // * screenshots question
  // TODO : build out functions to screenshot answers
  console.log(`Grabbing screenshots from ${questionURL}`);
  console.log("");
  await screenshot(questionURL, questionDataObj);
  await sleep();

  // TODO : build out functions using say to convert text to speech
  console.log(`Converting text from ${questionURL} to speech`);
  console.log("");
  // console.log(questionDataObj.textString);
  await convertTextToSpeech(questionDataObj.textString[0]);
  console.log(plainTextStrings.strings.length);
  async function getAnswerAudio() {
    for (let i = 0; i < plainTextStrings.strings.length; i++) {
      await convertTextToSpeech(plainTextStrings.strings[i]);
    }
  }
  await getAnswerAudio();
  await sleep();

  // * downloads video from youtube for background
  console.log(`Grabbing video from ${videoURL}`);
  console.log("");
  downloadVideo(videoURL);
  await sleep();

  // TODO : build out functions using etro to stitch them all together
  console.log("Wrapping up");
  // } else {
  // console.log(
  //   "You'll need to start over by typing 'node .' into your terminal."
  // );
  // }
}

// * called when user doesn't confirm their inputs, starts process over
async function startOver() {
  await getQuestionURL();
  await getVideoURL();
  await confirmStart();
}

// * function calls
await welcome();
await getQuestionURL();
await getVideoURL();
await confirmStart();

// console.log(questionURL, videoURL);
