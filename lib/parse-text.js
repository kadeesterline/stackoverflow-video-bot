#!/usr/bin/env node

export async function parseText(
  html,
  plainTextStrings,
  questionDataObj,
  isTitle
) {
  async function getPlainText(html, isTitle) {
    let textAns = [];
    if (html.length > 1) {
      for (let i = 0; i < html.length; i++) {
        let withQuote = html[i].replace(/&#39;/g, "'");
        let noCode = withQuote.replace(/<pre.*?>.*?<\/pre>/gs, "");
        let strippedHTML = noCode.replace(/<[^>]+>/g, "");
        let noNewLine = strippedHTML.replace(/\n/g, "");
        let withRightArrows = noNewLine.replace(/&gt;/g, ">");
        let withLeftArrows = withRightArrows.replace(/&lt;/g, "<");
        let withQuotes = withLeftArrows.replace(/&quot;/g, "'");

        let lastChar = withQuotes[withQuotes.length - 1];
        if (lastChar !== ".") {
          let result = withQuotes + ".";
          textAns[i] = result;
        } else {
          let result = withQuotes;
          textAns[i] = result;
        }
      }
      plainTextStrings.strings = textAns;
    } else {
      console.log(!!html);
      let withQuote = html[0].replace(/&#39;/g, "'");
      let noCode = withQuote.replace(/<pre.*?>.*?<\/pre>/gs, "");
      let strippedHTML = noCode.replace(/<[^>]+>/g, "");
      let noNewLine = strippedHTML.replace(/\n/g, "");
      let withArrows = noNewLine.replace(/&gt;/g, ">");
      let withQuotes = withArrows.replace(/&quot;/g, "'");

      let lastChar = withQuotes[withQuotes.length - 1];
      if (lastChar !== ".") {
        let result = withQuotes + ".";
        textAns[0] = result;
      } else {
        let result = withQuotes;
        textAns[0] = result;
      }

      if (isTitle) {
        questionDataObj.title = textAns;
      } else {
        questionDataObj.textString = textAns;
      }
    }
  }

  await getPlainText(html, isTitle);
}
