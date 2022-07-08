#!/usr/bin/env node

import fetch from "node-fetch";
import chalk from "chalk";
import { parseText } from "./parse-text.js";

export async function makeApiCall(
  questionURL,
  questionDataObj,
  plainTextStrings
) {
  const url = questionURL;

  const questionId = url
    .match(/\/(\d+)+[\/]?/g)
    .map((id) => id.replace(/\//g, ""));
  const qURL = `https://api.stackexchange.com/2.3/questions/${questionId}?order=desc&sort=activity&site=stackoverflow&filter=withbody`;
  const aURL = `https://api.stackexchange.com/2.3/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`;

  const getQuestionData = async () => {
    fetch(qURL)
      .then((r) => r.json())
      .then((data) => handleQuestionResponse(data));
  };

  function handleQuestionResponse(data) {
    if (data.items[0].is_answered !== true) {
      console.log(
        "Sorry, this question isn't answered yet. Try again with another question."
      );
      questionDataObj.isAnswered = data.items[0].is_answered;
    } else {
      questionDataObj.answerCount = data.items[0].answer_count;
      questionDataObj.htmlString = [data.items[0].body];
      // console.log(questionDataObj.htmlString);
    }
  }

  const getAnswerData = async () => {
    fetch(aURL)
      .then((r) => r.json())
      .then((data) => handleAnswerResponse(data));
  };

  function handleAnswerResponse(data) {
    let answersIds = data.items.map((el) => el.answer_id);
    questionDataObj.answerIds = answersIds;
    let htmlAns = data.items.map((el) => el.body);
    parseText(htmlAns, plainTextStrings, questionDataObj);
    parseText(questionDataObj.htmlString, plainTextStrings, questionDataObj);
  }

  getQuestionData();
  getAnswerData();
}
