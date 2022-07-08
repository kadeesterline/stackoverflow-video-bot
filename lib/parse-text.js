#!/usr/bin/env node

export async function parseText(html, plainTextStrings, questionDataObj) {
  async function getPlainText(html) {
    let textAns = [];
    if (html.length > 1) {
      for (let i = 0; i < html.length; i++) {
        let strippedHTML = html[i].replace(/<[^>]+>/g, "");
        let noNewLine = strippedHTML.replace(/\n/g, "");
        let withArrows = noNewLine.replace(/&gt;/g, ">");
        let withQuotes = withArrows.replace(/&quot;/g, "'");
        textAns[i] = withQuotes;
      }
      plainTextStrings.strings = textAns;
      console.log(plainTextStrings.strings);
    } else {
      // console.log(html[0]);
      let strippedHTML = html[0].replace(/<[^>]+>/g, "");
      let noNewLine = strippedHTML.replace(/\n/g, "");
      let withArrows = noNewLine.replace(/&gt;/g, ">");
      let withQuotes = withArrows.replace(/&quot;/g, "'");
      textAns[0] = withQuotes;
      questionDataObj.textString = textAns;
      console.log(questionDataObj.textString);
    }
  }

  getPlainText(html);
}
