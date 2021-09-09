"use strict";

const HTML = {};

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start()");
  HTML.colorPicker = document.querySelector("input");
  HTML.harmonySelector = document.querySelectorAll("option");
  HTML.harmonySelected = document.querySelector("select");

  HTML.colorDisplay = document.querySelector(".colorShow");
  trackColorPicker();
  trackHarmonySelector();
}

function trackColorPicker() {
  console.log("trackColorPicker()");
  HTML.colorPicker.addEventListener("input", updateColors);
}

function trackHarmonySelector() {
  console.log("trackHarmonySelector()");
  HTML.harmonySelector.forEach((element) => {
    element.addEventListener("click", updateColors);
  });
}

//DELEGATOR
function updateColors() {
  console.log(HTML.harmonySelected.value);
  const colorHex = HTML.colorPicker.value;
  console.log(colorHex);
  const objectRGB = calculateRGB(colorHex);
  const objectHSL = calculateHSL(objectRGB);
  console.log(objectRGB);
  const roundedHSL = roundHSL(objectHSL);
  console.log(roundedHSL);

  displayColor(colorHex);
}

function calculateRGB(value) {
  const value1 = value.substring(1, 3);
  const value2 = value.substring(3, 5);
  const value3 = value.substring(5, 7);
  const R = parseInt("0x" + value1, 16);
  const G = parseInt("0x" + value2, 16);
  const B = parseInt("0x" + value2, 16);
  return { R, G, B };
}

function calculateHSL(objectRGB) {
  let r = objectRGB.R;
  let g = objectRGB.G;
  let b = objectRGB.B;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  //   console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return { h, s, l };
}

function roundHSL(hsl) {
  const H = Math.round(hsl.h);
  const S = Math.round(hsl.s);
  const L = Math.round(hsl.l);
  return { H, S, L };
}

function displayColor(valueHex) {
  HTML.colorDisplay.style.background = valueHex;
}
