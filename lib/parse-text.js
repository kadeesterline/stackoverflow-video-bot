#!/usr/bin/env node

export async function parseText(html, plainTextStrings, questionDataObj) {
  async function getPlainText(html) {
    let textAns = [];
    if (html.length > 1) {
      for (let i = 0; i < html.length; i++) {
        let noCode = html[i].replace(/<pre.*?>.*?<\/pre>/gs, "");
        let strippedHTML = noCode.replace(/<[^>]+>/g, "");
        let noNewLine = strippedHTML.replace(/\n/g, "");
        let withRightArrows = noNewLine.replace(/&gt;/g, ">");
        let withLeftArrows = withRightArrows.replace(/&lt;/g, "<");
        let withQuotes = withLeftArrows.replace(/&quot;/g, "'");
        textAns[i] = withQuotes;
      }
      plainTextStrings.strings = textAns;
    } else {
      console.log(!!html);
      let noCode = html[0].replace(/<pre.*?>.*?<\/pre>/gs, "");
      let strippedHTML = noCode.replace(/<[^>]+>/g, "");
      let noNewLine = strippedHTML.replace(/\n/g, "");
      let withArrows = noNewLine.replace(/&gt;/g, ">");
      let withQuotes = withArrows.replace(/&quot;/g, "'");
      textAns[0] = withQuotes;
      questionDataObj.textString = textAns;
    }
  }

  await getPlainText(html);
}
