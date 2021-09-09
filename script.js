"use strict";

document.addEventListener("DOMContentLoaded", start);
const colorsArray = [];
const HTML = {};
const ColorCodes = {
  hex: "",
  rgb: "",
  hsl: "",
  css: "",
};

function start() {
  console.log("start()");
  HTML.colorPicker = document.querySelector("input");
  HTML.colorDisplay = document.querySelector(".displayedColor");
  HTML.codeHex = document.querySelector("li:first-child span");
  HTML.codeRGB = document.querySelector("#rgb");
  HTML.codeHSL = document.querySelector("#hsl");
  HTML.colorPicker.value = "#ffffff";
  updateColor(HTML.colorPicker.value);
  trackColorPicker();
}

function trackColorPicker() {
  console.log("trackColorPicker()");
  HTML.colorPicker.addEventListener("input", updateColor, false);
}

//delegator
function updateColor() {
  const currentColorHex = HTML.colorPicker.value;
  console.log(currentColorHex);
  const valueRGB = calculateRGB(currentColorHex);
  const valueHSL = calculateHSL(valueRGB);
  const roundedHSL = roundHSL(valueHSL);
  const rgbCss = getRgbCss(valueRGB);
  console.log(rgbCss);
  displayHex(currentColorHex);
  displayColor(currentColorHex);
  displayRGB(valueRGB);
  displayHSL(roundedHSL);
  const newObject = createColorCodesObject(currentColorHex, valueRGB, roundedHSL, rgbCss);
  pushObjectToArray(newObject);
}

function createColorCodesObject(code1, code2, code3, code4) {
  const colorObj = Object.create(ColorCodes);
  colorObj.hex = code1;
  colorObj.rgb = code2;
  colorObj.hsl = code3;
  colorObj.css = code4;
  return colorObj;
}

function pushObjectToArray(object1) {
  colorsArray.push(object1);
  console.log(colorsArray);
}

function displayHex(valueHex) {
  HTML.codeHex.textContent = valueHex;
}

function displayColor(valueHex) {
  HTML.colorDisplay.style.background = valueHex;
}

function calculateRGB(value) {
  const value1 = value.substring(1, 3);
  const value2 = value.substring(3, 5);
  const value3 = value.substring(5, 7);
  const r = parseInt("0x" + value1, 16);
  const g = parseInt("0x" + value2, 16);
  const b = parseInt("0x" + value2, 16);
  return { r, g, b };
}

function displayRGB(valueRGB) {
  HTML.codeRGB.textContent = `${valueRGB.r}, ${valueRGB.g}, ${valueRGB.b}`;
}

function calculateHSL(valueRGB) {
  let r = valueRGB.r;
  let g = valueRGB.g;
  let b = valueRGB.b;

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

function displayHSL(roundedHSL) {
  HTML.codeHSL.textContent = `${roundedHSL.H}°, ${roundedHSL.S}%, ${roundedHSL.L}%`;
}

function getRgbCss(valueRGB) {
  const rgbCss = `rgb(${valueRGB.r}, ${valueRGB.g}, ${valueRGB.b})`;
  return rgbCss;
}
