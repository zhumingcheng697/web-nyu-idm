let alt_text_element = document.getElementById("alt_text");
let center_container_element = document.getElementById("center-container");
let parsedSelectedElement = "";
let currentSmallestOrder = -1;

function selectA() {
  alt_text.className = "ac";
  alt_text_element.innerHTML = "You have selected A train.";
  // center_container_element.classList.add("enlarged");
  // center_container_element.parentNode.style.overflow = "hidden";
  // center_container_element.style.transform = "translate(30%, 10%)";
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
  // center_container_element.classList.remove("enlarged");
  // center_container_element.parentNode.style.overflow = "visible";
  // center_container_element.style.transform = "translate(0%, 0%)";
}

document.addEventListener("click", function(element) {
  let testElement = element.target;

  if (testElement.id && testElement.classList.contains("icon")) {
    if (parsedSelectedElement.startsWith(testElement.id)) {
      parsedSelectedElement = parsedSelectedElement + "*";
      if (parsedSelectedElement.startsWith(testElement.id + "*****")) {
        parsedSelectedElement = testElement.id + "*****";
        currentSmallestOrder--;
        (testElement.tagName === "IMG" ? testElement.parentNode.style.order = currentSmallestOrder : testElement.style.order = currentSmallestOrder);
        alt_text_element.innerHTML = "<b> ALRIGHT!!! I ALREADY KNOW<br>" + alt_text_element.innerHTML.slice(0,-1).toUpperCase() + "!!!</b>";
        alt_text.className = "default-alt_text";
        document.getElementById("footer").children[0].innerHTML = "<b>Congratulations!<br>You have found the easter egg!</b>"
        for (element of document.getElementsByClassName("icon")) {
          if (element.tagName === "DIV") {
            element.classList.add("big-margin");
          }
        }
      }
    } else {
      parsedSelectedElement = testElement.id + "*";
      document.getElementById("footer").children[0].innerHTML = "Hi. Welcome.";
      for (element of document.getElementsByClassName("icon")) {
        if (element.tagName === "DIV") {
          element.classList.remove("big-margin");
        }
      }
    }
  } else {
    parsedSelectedElement = "";
  }

  while (testElement) {
    if (document.getElementById("center-container") === testElement) {
      return;
    } else {
      testElement = testElement.parentNode;
    }
  }
  deselect();
  document.getElementById("footer").children[0].innerHTML = "Hi. Welcome.";
  for (element of document.getElementsByClassName("icon")) {
    if (element.tagName === "DIV") {
      element.classList.remove("big-margin");
    }
  }
});
