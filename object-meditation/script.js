let alt_text_element = document.getElementById('alt_text');

function selectA() {
  alt_text_element.style.setProperty("--alt_text-color", "blue");
  alt_text_element.innerHTML = "You have selected the A train.";
}

function selectC() {
  alt_text_element.style.setProperty("--alt_text-color", "blue");
  alt_text_element.innerHTML = "You have selected the C train.";
}

function selectF() {
  alt_text_element.style.setProperty("--alt_text-color", "orange");
  alt_text_element.innerHTML = "You have selected the F train.";
}

function selectR() {
  alt_text_element.style.setProperty("--alt_text-color", "yellow");
  alt_text_element.innerHTML = "You have selected the R train.";
}

function deselect() {
  alt_text_element.style.setProperty("--alt_text-color", (window.matchMedia("(prefers-color-scheme: light)").matches ? "#333" : "#ccc"));
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

window.matchMedia("(prefers-color-scheme: light)").addListener(function() {
    let color = getComputedStyle(alt_text_element).getPropertyValue("--alt_text-color");
    if (color === "#ccc" || color === "#333") {
      alt_text_element.style.setProperty("--alt_text-color", (window.matchMedia("(prefers-color-scheme: light)").matches ? "#333" : "#ccc"));
    }
  }
);

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
