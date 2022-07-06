import fetch from "node-fetch";
import chalk from "chalk";

export async function makeApiCall(questionURL) {
  const url = questionURL;
  const apiURL = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&url=${url}&site=stackoverflow`;

  //   let responseArr = [];
  const getQuestionData = async () => {
    fetch(apiURL)
      .then((r) => r.json())
      .then((data) => getQuestionObj(data));
  };

  function getQuestionObj(responseArr) {
    // console.log(responseArr);
    responseArr.items.forEach((element) => console.log(element.link));
    console.log(chalk.bgGreen(questionURL));
    const questionObj = responseArr.items.filter(
      (question) => question.link == url
    );
    console.log(questionObj);
  }

  getQuestionData();
}
