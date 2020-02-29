function selectA() {
  document.getElementById('alt_text').style.color = "blue";
  document.getElementById('alt_text').innerHTML = "You have selected the A train.";
}

function selectC() {
  document.getElementById('alt_text').style.color = "blue";
  document.getElementById('alt_text').innerHTML = "You have selected the C train.";
}

function selectF() {
  document.getElementById('alt_text').style.color = "orange";
  document.getElementById('alt_text').innerHTML = "You have selected the F train.";
}

function selectR() {
  document.getElementById('alt_text').style.color = "yellow";
  document.getElementById('alt_text').innerHTML = "You have selected the R train.";
}

function deselect() {
  document.getElementById('alt_text').style.color = "inherit";
  document.getElementById('alt_text').innerHTML = "You have not selected anything.";
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
