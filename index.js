let totalTime = 0;
let currentTime = 0;
let timePercent = 0.0;
let delayPercent = 0.0;
let lastKnownState = 0;

function calculate(time, delay, totalStates) {
  let keyframes = [];
  let newKeyframe = {};

  currentTime = 0;
  lastKnownState = 0;

  totalTime = (time + delay) * totalStates;

  calculatePercents(time, delay);

  while (currentTime < totalTime) {
    newKeyframe = {};

    calculateAnimTime(newKeyframe);
    currentTime += time;

    calculateDelayTime(newKeyframe);
    currentTime += delay;

    keyframes.push(newKeyframe);
  }

  return keyframes;
}

function calculateAnimTime(newKeyframe) {
  newKeyframe["time"] = (lastKnownState + timePercent).toFixed(2);
  lastKnownState += timePercent;
}
function calculateDelayTime(newKeyframe) {
  newKeyframe["delay"] = (lastKnownState + delayPercent).toFixed(2);
  lastKnownState += delayPercent;
}

function calculatePercents(time, delay) {
  timePercent = (time / totalTime) * 100;
  delayPercent = (delay / totalTime) * 100;
}

function generateCSS(keyframes, name) {
  let code = document.getElementById("code");
  code.innerText = "";
  code.innerText += `animation: ${name} ${totalTime}s infinite;\n\n`;
  code.innerText += `@keyframes ${name} {\n`;
  code.innerText += `\t0%{\n\t\t/* initial state here*/\n\t}\n`;
  for (let keyframe of keyframes) {
    code.innerText += `\t${keyframe.time}%,${keyframe.delay}%{\n\t\t/*state ${keyframes.indexOf(keyframe) + 1} style here*/\n\t}\n`;
  }
  code.innerText += `}`;
}

function handleSubmit(event) {
  event.preventDefault();

  let time = Number(event.target.animTime.value);
  let delay = Number(event.target.animDelay.value);
  let totalStates = Number(event.target.totalStates.value);
  let name = event.target.animName.value;
  let keyframes = calculate(time, delay, totalStates);

  generateCSS(keyframes, name);
}
