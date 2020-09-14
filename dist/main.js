"use strict";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var synth = new Tone.PolySynth().set({
  "oscillator": {
    "type": 'sawtooth'
  },
  "envelope": {
    "attack": 1,
    "decay": 0.1,
    "sustain": 0.3,
    "release": 3
  },
  "volume": 0
}).toMaster();
Tone.Transport.bpm.value = 20;
console.log(Tone.Transport.bpm);
var started = false;
var division = 24;
var detune = 0;
var pitchSet = []; // later!
// let steps = [0,1,0,2,0,3,0,4];
// let steps = [0,3,0,5,0,3,0,6];

var steps = [0, 5, 0, 6];
var currentStep = 0;

function pickDetune() {
  detune = 1200 / division * getRandomInt(0, division + 1);
  console.log('detune', detune);
  synth.detune.value = detune;
}

function incrementDetune() {
  detune += 1200 / division;

  if (detune > 1200) {
    detune = 0;
  }

  ;
  console.log('detune', detune);
  synth.detune.value = detune;
}

function moveStep() {
  detune = 1200 / division * steps[currentStep];
  currentStep++;

  if (currentStep >= steps.length) {
    currentStep = 0;
  }

  ;
  console.log('detune', detune);
  synth.detune.value = detune;
}

var startStop = document.getElementById('startstop'); //const loop = new Tone.Loop(time => { synth.triggerAttackRelease('C3', '16n') }, "8").start(0);

Tone.Transport.scheduleRepeat(onRepeat, '8n');

function onRepeat(time) {
  synth.triggerAttackRelease('C3', 1); // pickDetune();
  //  incrementDetune();

  moveStep();
}

var start = function start() {
  console.log('start');
  started = true;
  Tone.Transport.start();
};

var stop = function stop() {
  console.log('stopped');
  started = false;
  Tone.Transport.stop();
};

startStop.addEventListener('click', function () {
  Tone.context.resume();

  if (started) {
    stop();
  } else {
    start();
  }
});
window.addEventListener('keydown', function (e) {
  if (e.key === ' ') {
    Tone.context.resume();

    if (started) {
      stop();
    } else {
      start();
    }
  }
});