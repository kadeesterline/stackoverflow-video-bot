#!/usr/bin/env node

import fetch from "node-fetch";
import chalk from "chalk";
import { parseText } from "./parse-text.js";

export async function makeApiCall(
  questionURL,
  questionDataObj,
  plainTextStrings,
  fileNames
) {
  const url = questionURL;

  const questionId = url
    .match(/\/(\d+)+[\/]?/g)
    .map((id) => id.replace(/\//g, ""));
  const qURL = `https://api.stackexchange.com/2.3/questions/${questionId}?order=desc&sort=activity&site=stackoverflow&filter=withbody`;
  const aURL = `https://api.stackexchange.com/2.3/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`;

  const getQuestionData = async () => {
    await fetch(qURL)
      .then((r) => r.json())
      .then((data) => handleQuestionResponse(data));
  };

  async function handleQuestionResponse(data) {
    if (data.items[0].is_answered !== true) {
      console.log(
        "Sorry, this question isn't answered yet. Try again with another question."
      );
      questionDataObj.isAnswered = data.items[0].is_answered;
    } else {
      questionDataObj.answerCount = data.items[0].answer_count;
      questionDataObj.htmlString = [data.items[0].body];
      questionDataObj.title = [data.items[0].title];
    }
  }

  const getAnswerData = async () => {
    await fetch(aURL)
      .then((r) => r.json())
      .then((data) => handleAnswerResponse(data));
  };

  async function handleAnswerResponse(data) {
    let answersIds = data.items.map((el) => el.answer_id);
    questionDataObj.answerIds = answersIds;
    let htmlAns = data.items.map((el) => el.body);
    let titles = data.items.map((el) => `answer${el.answer_id}`);
    titles.forEach((el) => fileNames.push(el));
    // parse answers
    await parseText(htmlAns, plainTextStrings, questionDataObj);
    // parse question body
    await parseText(
      questionDataObj.htmlString,
      plainTextStrings,
      questionDataObj,
      false
    );
    // parse question title
    await parseText(
      questionDataObj.title,
      plainTextStrings,
      questionDataObj,
      true
    );
  }

  await getQuestionData();
  await getAnswerData();
}
