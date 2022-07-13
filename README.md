# StackOverflow video bot

This was inspired by [this](https://github.com/elebumm/RedditVideoMakerBot) project done by Lewis Menelaws & TMRRW.
The original project makes TikTok length videos out of Reddit questions.

This project takes in the URL for both a background video and the question you want to use and generates a video. Of course, this could be done manually, but where's the fun in that?

## Requirements

- NodeJS (install node and npm [here](https://nodejs.org/en/download/))
- Google Cloud account (steps below to set this up)
- Ffmpeg (install ffmpeg [here](https://ffmpeg.org/download.html))

## Installation and Set Up

In order to run this app you'll need to setup and use a google cloud account as well as a service account. Below are the complete steps you'll need to take to both set up a google cloud account, set your access keys and run the app.

Google Cloud set up:

1. Navigate to [this link](https://console.cloud.google.com/). If you need to create an account, do so.
2. Create a new project and call it what ever you want
3. Search for 'Cloud Text-to-Speech API' in the search bar
4. After adding the API to your project, click the three lines in the top left corner to expand the side bar
5. Hover over 'IAM & Admin' and Service Accounts
6. At the top of the page click 'Create Service Account'
7. After giving the account a name (I would reccommend something like 'text to speech account') click continue
8. Click select role and scroll down to Service Accounts, and select Service Account User
9. Click through the rest of the prompts and then click 'Manage Keys' after clicking the three dots under 'Actions'
10. Click 'Add Key', 'Create New Key', and make sure JSON is selected before finally clicking create.

Now you should have downloaded a json file containing your keys. You can move this file anywhere you'd like just make sure you aren't moving it into a git repository as you don't want your keys on github.

11. Clone this repository if you haven't already.
12. Navigate to within the project from your terminal.
13. run `npm install`
14. run `export GOOGLE_APPLICATION_CREDENTIALS=KEY_PATH` replacing 'KEY_PATH' with the path to where you saved your json keys.
15. run `node .` to run the app

## Usage

To use the app, first follow the instructions for installation/set up. After running the `node .` command, you'll be greeted and prompted to provide a link to a stackoverflow question. After entering the stackoverflow question, you'll be prompted for a link to a youtube video to use as the background. After confirming that both links you entered are correct, the app will begin gathering the needed resources to make the video for you. Depending on the question thread and the video you want as your background, the whole process may take awhile. Example outputs will be coming soon!

## Contributing

At the moment I'm not looking for others to contribute to the main branch/fork of this app. You're more than welcome to fork the project and make changes but anything pushed to main will be ignored.

If in the future this changes and I'm looking for additional contributors this will be updated to reflect that. In the meantime, if you'd like to suggest a feature open an issue and if it's reasonable I'll try to implement it.

## Developers

Kade Esterline (kadeesterline) - https://github.com/kadeesterline
