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
  displayColor(colorHex);
}

function displayColor(valueHex) {
  HTML.colorDisplay.style.background = valueHex;
}
