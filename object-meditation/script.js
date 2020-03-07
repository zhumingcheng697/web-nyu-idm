let alt_text_element = document.querySelector("#alt_text");
let center_container_element = document.querySelector("#center-container");
// let parsedSelectedElement = "";
// let currentSmallestOrder = -1;
let isInLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
document.querySelector("#color-mode").innerHTML = `<img src="assets/${isInLightMode ? `light` : `dark`}.png" onclick="switchColorMode()">`;

function switchColorMode() {
  isInLightMode = !isInLightMode;
  document.body.classList.remove(isInLightMode ? "forcedDarkMode" : "forcedLightMode");
  document.body.classList.add(isInLightMode ? "forcedLightMode" : "forcedDarkMode");
  document.querySelector("#color-mode").innerHTML = `<img src="assets/${isInLightMode ? `light` : `dark`}.png" onclick="switchColorMode()">`;
}

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
  alt_text.className = "a";
}

function selectC() {
  alt_text.className = "c";
}

function selectD() {
  alt_text.className = "d";
}

function selectF() {
  alt_text.className = "f";
}

function selectG() {
  alt_text.className = "g";
}

function selectR() {
  alt_text.className = "r";
}

function select2() {
  alt_text.className = "two"
}

function select7() {
  alt_text.className = "seven";
}

function selectAirTrain() {
  alt_text.className = "air-train";
}

function selectPath() {
  alt_text.className = "path";
}

function selectNJTransit() {
  alt_text.className = "nj-transit";
}

function selectAmtrak() {
  alt_text.className = "amtrak";
}

function showIcons() {
  if (window.matchMedia("(hover: none)").matches && !document.querySelector("#center-container").classList.contains("tapped")) {
    document.querySelector("#center-container").classList.add("tapped");
  } else if (window.matchMedia("(hover: none)").matches && document.querySelector("#center-container").classList.contains("tapped")) {
    document.querySelector("#center-container").classList.remove("tapped");
  }
}

function seeNoteMd() {
  if (!document.querySelector("#note-container").classList.contains("hide")) {
    document.querySelector("#center-container").classList.remove("hide");
    document.querySelector("#footer p").innerHTML = "view my notes.md";
    document.querySelector("#note-container").classList.add("hide");
    document.querySelector("#color-mode").classList.remove("hide");
  } else {
    document.querySelector("#note-container").scrollTop = 0;
    document.querySelector("#center-container").classList.add("hide");
    document.querySelector("#footer p").innerHTML = "back to home";
    document.querySelector("#note-container").classList.remove("hide");
    document.querySelector("#color-mode").classList.add("hide");
  }
}

function deselect() {
  alt_text.className = "default-alt_text";
  if (alt_text_element.innerHTML !== "This is where the image goes.") {
    alt_text_element.innerHTML = "You have not selected anything.";
  }
  document.querySelector("#title").classList.remove("hide");
  document.querySelector("#footer").classList.remove("hide");
  document.querySelector("#color-mode").classList.remove("hide");
  center_container_element.parentNode.style.overflow = "visible";
  center_container_element.style.transform = "translate(0%, 0%)";

  if (window.matchMedia("(hover: none)").matches) {
    document.querySelector("#center-container").classList.remove("tapped");
  }
}

window.matchMedia("(prefers-color-scheme: light)").addListener(match => {
  isInLightMode = match.matches;
  document.querySelector("#color-mode").innerHTML = `<img src="assets/${isInLightMode ? `light` : `dark`}.png" onclick="switchColorMode()">`;
  document.body.classList.remove("forcedDarkMode");
  document.body.classList.remove("forcedLightMode");
});

document.addEventListener("click", click => {
  let clickedElement = click.target;

  if (clickedElement.id && clickedElement.classList.contains("icon")) {
    if (window.matchMedia("(hover: none)").matches) {
      document.querySelector("#center-container").classList.remove("tapped");
    }

    if (!document.querySelector("#title").classList.contains("hide")) {
      document.querySelector("#title").classList.add("hide");
      document.querySelector("#footer").classList.add("hide");
      document.querySelector("#icon-grid").classList.add("hide");
      document.querySelector("#metro-card-container").classList.add("hide");
    }



    // let n = 3;
    // if (!window.matchMedia("(max-width: 600px)").matches) {
    //   document.querySelector("#title").classList.add("hide");
    //   document.querySelector("#footer").classList.add("hide");
    //   document.querySelector("#color-mode").classList.add("hide");
    //   center_container_element.parentNode.style.overflow = "hidden";
    //   if (positionOfE(clickedElement).centerY - windowSize().height / 2 < 0) {
    //     center_container_element.style.transform = `translate(${n * (windowSize().width / 2 - positionOfE(clickedElement).centerX)}px, ${windowSize().height - positionOfE(center_container_element).centerY - 50 + positionOfE(center_container_element).height / 2}px)`;
    //   } else {
    //     center_container_element.style.transform = `translate(${n * (windowSize().width / 2 - positionOfE(clickedElement).centerX)}px, ${- positionOfE(center_container_element).centerY + 50 - positionOfE(center_container_element).height / 2}px)`;
    //   }
    // }

    // if (parsedSelectedElement.startsWith(clickedElement.id)) {
    //   parsedSelectedElement = parsedSelectedElement + "*";
    //   if (parsedSelectedElement.startsWith(clickedElement.id + "**********")) {
    //     for (icon of document.querySelectorAll(".icon")) {
    //       icon.style.opacity = "0.8";
    //       icon.style.transform = "scale(1)";
    //       icon.style.filter = "grayscale(1)";
    //       icon.style.pointerEvents = "none";
    //     }
    //   }
    //
    //   if (parsedSelectedElement.startsWith(clickedElement.id + "*****")) {
    //     currentSmallestOrder--;
    //     (clickedElement.tagName === "IMG" ? clickedElement.parentNode.style.order = currentSmallestOrder : clickedElement.style.order = currentSmallestOrder);
    //     alt_text_element.innerHTML = "<b> ALRIGHT!!! I ALREADY KNOW<br>" + alt_text_element.innerHTML.slice(0,-1).toUpperCase() + "!!!</b>";
    //     alt_text.className = "default-alt_text";
    //     for (icon of document.querySelectorAll("div.icon")) {
    //       icon.classList.add("big-margin");
    //     }
    //   }
    // } else {
    //   parsedSelectedElement = clickedElement.id + "*";
    //   for (icon of document.querySelectorAll("div.icon")) {
    //     icon.classList.remove("big-margin");
    //   }
    // }
  }

  if (document.querySelector("#note-container").classList.contains("hide") && clickedElement.parentNode && clickedElement.parentNode.id !== "footer") {
    while (clickedElement) {
      if (document.querySelector("#center-container") === clickedElement) {
        return;
      } else {
        clickedElement = clickedElement.parentNode;
      }
    }

    deselect();
  }

  // for (icon of document.querySelectorAll("div.icon")) {
  //   icon.classList.remove("big-margin");
  // }
  // parsedSelectedElement = "";
});
