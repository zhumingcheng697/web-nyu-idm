let alt_text_element = document.querySelector("#alt_text");
let center_container_element = document.querySelector("#center-container");
let parsedSelectedElement = "";
let currentSmallestOrder = -1;

function positionOfS(selector) {
  let box = document.querySelector(selector).getBoundingClientRect();
  return {
    left: box.left.toFixed(2),
    right: box.right.toFixed(2),
    top: box.top.toFixed(2),
    bottom: box.bottom.toFixed(2),
    centerX: ((box.left + box.right) / 2).toFixed(2),
    centerY: ((box.top + box.bottom) / 2).toFixed(2),
    width: (box.right - box.left).toFixed(2),
    height: (box.bottom - box.top).toFixed(2)
  };
}

function positionOfE(element) {
  let box = element.getBoundingClientRect();
  return {
    left: box.left.toFixed(2),
    right: box.right.toFixed(2),
    top: box.top.toFixed(2),
    bottom: box.bottom.toFixed(2),
    centerX: ((box.left + box.right) / 2).toFixed(2),
    centerY: ((box.top + box.bottom) / 2).toFixed(2),
    width: (box.right - box.left).toFixed(2),
    height: (box.bottom - box.top).toFixed(2)
  };
}

function windowSize() {
  return {width: window.innerWidth, height: window.innerHeight};
}

function selectA() {
  alt_text.className = "ac";
  alt_text_element.innerHTML = "You have selected A train.";
}

function selectC() {
  alt_text.className = "ac";
  alt_text_element.innerHTML = "You have selected C train.";
}

function selectD() {
  alt_text.className = "df";
  alt_text_element.innerHTML = "You have selected D train.";
}

function selectF() {
  alt_text.className = "df";
  alt_text_element.innerHTML = "You have selected F train.";
}

function selectG() {
  alt_text.className = "g";
  alt_text_element.innerHTML = "You have selected G train.";
}

function selectR() {
  alt_text.className = "r";
  alt_text_element.innerHTML = "You have selected R train.";
}

function select2() {
  alt_text.className = "two"
  alt_text_element.innerHTML = "You have selected 2 train.";
}

function select7() {
  alt_text.className = "seven";
  alt_text_element.innerHTML = "You have selected 7 train.";
}

function selectAirTrain() {
  alt_text.className = "air-train";
  alt_text_element.innerHTML = "You have selected AirTrain.";
}

function selectPath() {
  alt_text.className = "path";
  alt_text_element.innerHTML = "You have selected PATH.";
}

function selectNJTransit() {
  alt_text.className = "nj-transit";
  alt_text_element.innerHTML = "You have selected NJ Transit.";
}

function selectAmtrak() {
  alt_text.className = "amtrak";
  alt_text_element.innerHTML = "You have selected Amtrak.";
}

function deselect() {
  alt_text.className = "default-alt_text";
  if (alt_text_element.innerHTML !== "This is where the image goes.") {
    alt_text_element.innerHTML = "You have not selected anything.";
  }
  document.querySelector("#title").classList.remove("hide");
  document.querySelector("#footer").classList.remove("hide");
  center_container_element.parentNode.style.overflow = "visible";
  center_container_element.style.transform = "translate(0%, 0%)";
}

document.addEventListener("click", function(element) {
  let clickedElement = element.target;

  if (clickedElement.id && clickedElement.classList.contains("icon")) {

    document.querySelector("#title").classList.add("hide");
    document.querySelector("#footer").classList.add("hide");
    center_container_element.parentNode.style.overflow = "hidden";

    let n = 3;

    if (!window.matchMedia("(max-width: 600px)").matches) {
      if (positionOfE(clickedElement).centerY - windowSize().height / 2 < 0) {
        center_container_element.style.transform = `translate(${n * (windowSize().width / 2 - positionOfE(clickedElement).centerX)}px, ${windowSize().height - positionOfE(center_container_element).centerY - 50 + positionOfE(center_container_element).height / 2}px)`;
      } else {
        center_container_element.style.transform = `translate(${n * (windowSize().width / 2 - positionOfE(clickedElement).centerX)}px, ${- positionOfE(center_container_element).centerY + 50 - positionOfE(center_container_element).height / 2}px)`;
      }
    }

    if (parsedSelectedElement.startsWith(clickedElement.id)) {
      parsedSelectedElement = parsedSelectedElement + "*";
      if (parsedSelectedElement.startsWith(clickedElement.id + "**********")) {
        for (icon of document.querySelectorAll(".icon")) {
          icon.style.opacity = "0.8";
          icon.style.transform = "scale(1)";
          icon.style.filter = "grayscale(1)";
          icon.style.pointerEvents = "none";
        }
      }

      if (parsedSelectedElement.startsWith(clickedElement.id + "*****")) {
        currentSmallestOrder--;
        (clickedElement.tagName === "IMG" ? clickedElement.parentNode.style.order = currentSmallestOrder : clickedElement.style.order = currentSmallestOrder);
        alt_text_element.innerHTML = "<b> ALRIGHT!!! I ALREADY KNOW<br>" + alt_text_element.innerHTML.slice(0,-1).toUpperCase() + "!!!</b>";
        alt_text.className = "default-alt_text";
        document.querySelector("#footer p").innerHTML = "<b>Congratulations!<br>You have found the easter egg!</b>"
        for (icon of document.querySelectorAll("div.icon")) {
          icon.classList.add("big-margin");
        }
      }
    } else {
      parsedSelectedElement = clickedElement.id + "*";
      document.querySelector("#footer p").innerHTML = "Hi. Welcome.";
      for (icon of document.querySelectorAll("div.icon")) {
        icon.classList.remove("big-margin");
      }
    }
  }

  while (clickedElement) {
    if (document.querySelector("#center-container") === clickedElement) {
      return;
    } else {
      clickedElement = clickedElement.parentNode;
    }
  }
  deselect();
  document.querySelector("#footer p").innerHTML = "Hi. Welcome.";
  for (icon of document.querySelectorAll("div.icon")) {
    icon.classList.remove("big-margin");
  }
  parsedSelectedElement = "";
});
