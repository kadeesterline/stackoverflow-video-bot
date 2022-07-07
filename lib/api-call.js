import fetch from "node-fetch";
import chalk from "chalk";

export async function makeApiCall(questionURL, questionDataObj) {
  const url = questionURL;

  const getQuestionData = async () => {
    const questionId = url
      .match(/\/(\d+)+[\/]?/g)
      .map((id) => id.replace(/\//g, ""));
    const apiURL = `https://api.stackexchange.com/2.3/questions/${questionId}?order=desc&sort=activity&site=stackoverflow`;
    fetch(apiURL)
      .then((r) => r.json())
      .then((data) => handleResponse(data));
  };

  function handleResponse(data) {
    console.log(data);
    if (data.items[0].is_answered !== true) {
      console.log(
        "Sorry, this question isn't answered yet. Try again with another question."
      );
      questionDataObj.isAnswered = data.items[0].is_answered;
    } else {
      questionDataObj.answerCount = data.items[0].answer_count;
      console.log(questionDataObj);
    }
  }

  getQuestionData();
}
