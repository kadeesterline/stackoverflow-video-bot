import ffmpeg from "fluent-ffmpeg";

export async function addAudio(title) {
  let audio = `audio/${title}.mp3`;
  let video = `videos/${title}.mov`;
  new ffmpeg().addInput(video).addInput(audio).save(`temp/${title}.m4v`);
}
