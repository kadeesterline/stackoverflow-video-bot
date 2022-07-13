#!/usr/bin/env node

import puppeteer from "puppeteer";

export async function screenshot(questionURL, questionDataObj) {
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

    for (let i = 0; i < questionDataObj.answerIds.length; i++) {
      await page.waitForSelector(`#answer-${questionDataObj.answerIds[i]}`);
      const answerText = await page.$(
        `#answer-${questionDataObj.answerIds[i]}`
      );

      const [button] = await page.$x("//button[contains(., 'Dismiss')]");
      if (button) {
        await button.evaluate((b) => b.click());
      }
      await answerText.screenshot({
        path: `./screenshots/answer${questionDataObj.answerIds[i]}.png`,
      });
    }

    // close page and browser
    await page.close();
    await browser.close();
  };

  getScreenShot();
}
