export async function parseText(html, plainTextStrings) {
  async function getPlainText(html) {
    let textAns = [];
    if (html.length > 1) {
      console.log(html[5]);
      for (let i = 0; i < html.length; i++) {
        let strippedHTML = html[i].replace(/<[^>]+>/g, "");
        let noNewLine = strippedHTML.replace(/\n/g, "");
        let withArrows = noNewLine.replace(/&gt;/g, ">");
        let withQuotes = withArrows.replace(/&quot;/g, "'");
        textAns[i] = withQuotes;
      }
      plainTextStrings = textAns;
      console.log(plainTextStrings);
    } else {
      console.log("havent built this out yet");
    }
  }

  getPlainText(html);
}
