import puppeteer from "puppeteer";

export async function screenshot(questionURL) {
  const url = questionURL;

  /**
   * Opens headless browser, then navigates to URL passed in
   * if page asks for cookies, close prompt
   * find question and screenshot it
   */

  const getScreenShot = async () => {
    // open browser and navigate to questionURL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // if page has cookies prompt, close prompt
    const [cookieButton] = await page.$x(
      "//button[contains(., 'Accept all cookies')]"
    );
    if (cookieButton) {
      await cookieButton.click();
    }
    // find question title and screenshot it
    await page.waitForSelector("#question-header");
    const questionTitle = await page.$("#question-header");
    await questionTitle.screenshot({
      path: "./screenshots/question-title.png",
    });
    // find question body and screenshot it
    await page.waitForSelector(
      "#question > div.post-layout > div.postcell.post-layout--right"
    );
    const questionBody = await page.$(
      "#question > div.post-layout > div.postcell.post-layout--right"
    );
    await questionBody.screenshot({
      path: "./screenshots/question-body.png",
    });
    // find questions first answer
    await page.waitForSelector(
      "#answer-5963610 > div > div.answercell.post-layout--right > div.s-prose.js-post-body"
    );
    const questionAnswer = await page.$(
      "#answer-5963610 > div > div.answercell.post-layout--right > div.s-prose.js-post-body"
    );

    // if page gives trending sort prompt
    const [trendingButton] = await page.$x("//button[contains(., 'Dismiss')]");
    if (trendingButton) {
      await trendingButton.click();
    }
    // screenshot the answer
    await questionAnswer.screenshot({
      path: "./screenshots/question-answer.png",
    });

    // screenshot whole page
    await page.screenshot({
      path: "./screenshots/screenshot.png",
      fullPage: false,
      omitBackground: true,
    });
    // close page and browser
    await page.close();
    await browser.close();
  };

  getScreenShot();
}
