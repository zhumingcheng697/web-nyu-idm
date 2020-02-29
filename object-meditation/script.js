let alt_text_element = document.getElementById('alt_text');

function select2() {
  alt_text.className = "two"
  alt_text_element.innerHTML = "You have selected 2 train.";
}

function select7() {
  alt_text.className = "seven";
  alt_text_element.innerHTML = "You have selected 7 train.";
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

function selectAmtrak() {
  alt_text.className = "amtrak";
  alt_text_element.innerHTML = "You have selected Amtrak.";
}

function selectNJTransit() {
  alt_text.className = "nj-transit";
  alt_text_element.innerHTML = "You have selected NJ Transit.";
}

function selectPath() {
  alt_text.className = "path";
  alt_text_element.innerHTML = "You have selected PATH.";
}

function selectAirTrain() {
  alt_text.className = "air-train";
  alt_text_element.innerHTML = "You have selected AirTrain.";
}

function deselect() {
  alt_text.className = "default-alt_text";
  alt_text_element.innerHTML = "You have not selected anything.";
}

function firstElementDoesNotInclude(test) {
  if (test.length < 2) {
    return false;
  } else {
    for (i=1; i<test.length; i++) {
      if (test[0] === test[i]) {
        return false;
      }
    }
    return true;
  }
}

document.addEventListener("click", function(element) {
  let testElement = element.target;
  while (testElement) {
    if (document.getElementById('center-container') === testElement) {
      return;
    } else {
      testElement = testElement.parentNode;
    }
  }
  deselect();
});
