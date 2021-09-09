"use strict";

const HTML = {};
const RGB = { r: "", g: "", b: "" };
const Color = { hex: "", rgb: "", hsl: "" };

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
  const selectedHarmony = HTML.harmonySelected.value;
  const colorHex = HTML.colorPicker.value;
  console.log(colorHex);
  //get RGB
  const objectRGB = calculateRGB(colorHex);
  console.log(objectRGB);
  //get HSL
  const objectHSL = calculateHSL(objectRGB);
  console.log(objectHSL);
  //round HSL
  // const roundedHSL = roundHSL(objectHSL);
  // console.log(roundedHSL);
  //make hslArray of the colour selection
  const arrayHSL = makeArrayHSl(objectHSL);
  //decideHarmony(selectedHarmony);
  const analogueHarmonyHSL = calculateAnalogue(arrayHSL);
  const analogueHarmonyRGB = calculateHSLtoRGB(analogueHarmonyHSL);
  const analogueHarmonyHex = calculateRGBtoHex(analogueHarmonyRGB);
  const colorsArray = createColorsArray(analogueHarmonyHex, analogueHarmonyRGB, analogueHarmonyHSL);
  roundHSL(colorsArray);
  console.log(colorsArray);
  //display color
  colorsArray.forEach(displayColor);
}

function calculateRGB(value) {
  const value1 = value.substring(1, 3);
  const value2 = value.substring(3, 5);
  const value3 = value.substring(5, 7);
  const R = parseInt("0x" + value1, 16);
  const G = parseInt("0x" + value2, 16);
  const B = parseInt("0x" + value3, 16);
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
  // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return { h, s, l };
}

function roundHSL(array) {
  array.forEach((object) => {
    object.hsl.h = Math.round(object.hsl.h);
    object.hsl.s = Math.round(object.hsl.s);
    object.hsl.l = Math.round(object.hsl.l);
  });

  return array;
}

function makeArrayHSl(roundedHSL) {
  const hslValues = [];
  //reset hslValues array
  for (let iterator = 0; iterator <= 4; iterator++) {
    hslValues[iterator] = Object.assign({}, roundedHSL);
  }
  return hslValues;
}

function decideHarmony(harmony, arrayHSL) {
  //TODO Make if statements for harmonies
  calculateAnalogue(arrayHSL);
}

function calculateAnalogue(arrayHSL) {
  //TODO calculate on all array values and return new HSL values
  arrayHSL[1].h = arrayHSL[1].h + 10;
  arrayHSL[2].h = arrayHSL[2].h + 20;
  arrayHSL[3].h = arrayHSL[3].h + 30;
  arrayHSL[4].h = arrayHSL[4].h + 40;
  arrayHSL.forEach((hsl) => {
    if (hsl.h > 360) {
      hsl.h = hsl.h % 360;
      return arrayHSL;
    }
  });
  return arrayHSL;
}

function calculateHSLtoRGB(array) {
  const arrayRGB = [];
  array.forEach((hsl) => {
    let h = hsl.h;
    let s = hsl.s;
    let l = hsl.l;
    h = h;
    s = s / 100;
    l = l / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const rgbObj = Object.create(RGB);
    rgbObj.r = r;
    rgbObj.g = g;
    rgbObj.b = b;
    arrayRGB.push(rgbObj);
  });
  return arrayRGB;
}

function calculateRGBtoHex(array) {
  const arrayHex = [];
  array.forEach((rgb) => {
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    arrayHex.push("#" + r + g + b);
  });
  return arrayHex;
}

function createColorsArray(hex, rgb, hsl) {
  const colors = [];
  for (let iterator = 0; iterator <= 4; iterator++) {
    const color = Object.create(Color);
    color.hex = hex[iterator];
    color.rgb = rgb[iterator];
    color.hsl = hsl[iterator];
    colors.push(color);
  }
  return colors;
}

function displayColor(color) {
  console.log(color);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article > .displayColor").style.background = color.hex;
  copy.querySelector("article > .hex").textContent = color.hex;
  const parent = document.querySelector("section");
  parent.appendChild(copy);
}
