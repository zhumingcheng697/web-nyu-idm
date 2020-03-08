let xCord, yCord, pageY, startTime;
let shouldPlay = false;
let audioLoaded = false;

let isInLightMode;
if (document.cookie && (document.cookie.includes("colorMode=forcedLightMode") || document.cookie.includes("colorMode=forcedDarkMode"))) {
  isInLightMode = document.cookie.includes("colorMode=forcedLightMode") ? true : false;
  document.body.classList.add(isInLightMode ? "forcedLightMode" : "forcedDarkMode");
} else {
  isInLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
}
document.querySelector("#color-mode").innerHTML = `<img src="assets/${isInLightMode ? `light` : `dark`}.png">`;

function switchColorMode() {
  isInLightMode = !isInLightMode;
  document.body.classList.remove(isInLightMode ? "forcedDarkMode" : "forcedLightMode");
  document.body.classList.add(isInLightMode ? "forcedLightMode" : "forcedDarkMode");
  document.cookie = `colorMode=${isInLightMode ? "forcedLightMode" : "forcedDarkMode"}; path=/;`;
  document.querySelector("#color-mode").innerHTML = `<img src="assets/${isInLightMode ? `light` : `dark`}.png">`;
}

function isInRect(x, y) {
  function pos() {
    let box = document.querySelector("img#metro-card").getBoundingClientRect();
    return {
      left: box.left,
      right: box.right,
      top: box.top,
      bottom: box.bottom,
      centerX: ((box.left + box.right) / 2),
      centerY: ((box.top + box.bottom) / 2),
      width: (box.right - box.left),
      height: (box.bottom - box.top)
    };
  }

  let nW = document.querySelector("img#metro-card").naturalWidth;
  let nH = document.querySelector("img#metro-card").naturalHeight;

  if ((pos().width / pos().height) >= (nW / nH)) {
    if (y >= pos().top && y <= pos().bottom && x >= pos().centerX - (pos().height / nH * nW / 2) && x <= pos().centerX + (pos().height / nH * nW / 2)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (x >= pos().left && x <= pos().right && y >= pos().centerY - (pos().width / nW * nH / 2) && y <= pos().centerY + (pos().width / nW * nH / 2)) {
      return true;
    } else {
      return false;
    }
  }
}

/*
// function positionOfS(selector) {
//   let box = document.querySelector(selector).getBoundingClientRect();
//   return {
//     left: box.left.toFixed(2),
//     right: box.right.toFixed(2),
//     top: box.top.toFixed(2),
//     bottom: box.bottom.toFixed(2),
//     centerX: ((box.left + box.right) / 2).toFixed(2),
//     centerY: ((box.top + box.bottom) / 2).toFixed(2),
//     width: (box.right - box.left).toFixed(2),
//     height: (box.bottom - box.top).toFixed(2)
//   };
// }
//
// function positionOfE(element) {
//   let box = element.getBoundingClientRect();
//   return {
//     left: box.left.toFixed(2),
//     right: box.right.toFixed(2),
//     top: box.top.toFixed(2),
//     bottom: box.bottom.toFixed(2),
//     centerX: ((box.left + box.right) / 2).toFixed(2),
//     centerY: ((box.top + box.bottom) / 2).toFixed(2),
//     width: (box.right - box.left).toFixed(2),
//     height: (box.bottom - box.top).toFixed(2)
//   };
// }
//
// function windowSize() {
//   return {width: window.innerWidth, height: window.innerHeight};
// }

// function selectA() {
//   alt_text.className = "a";
// }
//
// function selectC() {
//   alt_text.className = "c";
// }
//
// function selectD() {
//   alt_text.className = "d";
// }
//
// function selectF() {
//   alt_text.className = "f";
// }
//
// function selectG() {
//   alt_text.className = "g";
// }
//
// function selectR() {
//   alt_text.className = "r";
// }
//
// function select2() {
//   alt_text.className = "two"
// }
//
// function select7() {
//   alt_text.className = "seven";
// }
//
// function selectAirTrain() {
//   alt_text.className = "air-train";
// }
//
// function selectPath() {
//   alt_text.className = "path";
// }
//
// function selectNJTransit() {
//   alt_text.className = "nj-transit";
// }
//
// function selectAmtrak() {
//   alt_text.className = "amtrak";
// }
*/

document.querySelectorAll("#footer p, div.icon, div.big-logo").forEach(element => {
  element.addEventListener("touchstart", () => {
    element.classList.add("tapped");
  });
});

document.addEventListener("touchend", touchend => {
  document.querySelectorAll("#footer p, div.icon, div.big-logo").forEach(element => {
    element.classList.remove("tapped");
  });
});

document.querySelector("#metro-card-container").addEventListener("mousedown", mousedown => {
  mousedown.preventDefault();
  if (isInRect(mousedown.clientX, mousedown.clientY) && document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused) {
    xCord = mousedown.clientX;
    yCord = mousedown.clientY;
    pageY = mousedown.pageY;
    shouldPlay = true;
    startTime = new Date();
  }
});

document.querySelector("#metro-card-container").addEventListener("touchstart", touchstart => {
  if (touchstart.touches.length === 1 && isInRect(touchstart.touches[0].clientX, touchstart.touches[0].clientY) && document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused) {
    xCord = touchstart.touches[0].clientX;
    yCord = touchstart.touches[0].clientY;
    pageY = touchstart.touches[0].pageY;
    shouldPlay = true;
    startTime = new Date();
  }
});

document.addEventListener("mouseup", mouseup => {
  if (document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused && shouldPlay) {
    let shouldWork;
    if (xCord - mouseup.clientX >= 80 && Math.abs(yCord - mouseup.clientY) <= 40 && (new Date()).valueOf() - startTime.valueOf() <= 1000 && Math.abs(Math.abs(pageY - mouseup.pageY) - Math.abs(yCord - mouseup.clientY)) <= 30 && (new Date()).valueOf() - startTime.valueOf() >= 200) {
      shouldWork = (Math.random() <= 0.9);
    } else if (Math.abs(xCord - mouseup.clientX) <= 30 && (Math.abs(yCord - mouseup.clientY) <= 20 || Math.abs(Math.abs(pageY - mouseup.pageY) - Math.abs(yCord - mouseup.clientY)) > 30)) {
      shouldPlay = false;
      return;
    } else {
      shouldWork = false;
    }

    let playPromise = document.querySelector(shouldWork ? "#one_beep" : "#two_beep").play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        alert(shouldWork ? `Paid $2.75\nBal $${(2.74 - Math.random()*0.04).toFixed(2)}`.toUpperCase() : "Please swipe again".toUpperCase());
      }).catch(() => {
        alert("Your browser has disabled auto-play. Turn it on to explore all features.");
      });
    }
  }
  shouldPlay = false;
});

document.addEventListener("touchend", touchend => {
  if (touchend.changedTouches.length === 1 && document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused && shouldPlay) {
    let shouldWork;
    if (xCord - touchend.changedTouches[0].clientX >= 80 && Math.abs(yCord - touchend.changedTouches[0].clientY) <= 40 && Math.abs(Math.abs(pageY - touchend.changedTouches[0].pageY) - Math.abs(yCord - touchend.changedTouches[0].clientY)) <= 30 && (new Date()).valueOf() - startTime.valueOf() <= 1000 && (new Date()).valueOf() - startTime.valueOf() >= 100) {
      shouldWork = (Math.random() <= 0.9);
    } else if (Math.abs(xCord - touchend.changedTouches[0].clientX) <= 30 && (Math.abs(yCord - touchend.changedTouches[0].clientY) <= 20 || Math.abs(Math.abs(pageY - touchend.changedTouches[0].pageY) - Math.abs(yCord - touchend.changedTouches[0].clientY)) > 30)) {
      shouldPlay = false;
      return;
    } else {
      shouldWork = false;
    }

    let playPromise = document.querySelector(shouldWork ? "#one_beep" : "#two_beep").play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        alert(shouldWork ? `Paid $2.75\nBal $${(2.74 - Math.random()*0.04).toFixed(2)}`.toUpperCase() : "Please swipe again".toUpperCase());
      }).catch(() => {
        alert("Your browser has disabled auto-play. Turn it on to explore all features.");
      });
    }
  }
  shouldPlay = false;
});

window.matchMedia("(prefers-color-scheme: light)").addListener(match => {
  isInLightMode = match.matches;
  document.querySelector("#color-mode").innerHTML = `<img src="assets/${isInLightMode ? `light` : `dark`}.png">`;
  document.body.classList.remove("forcedDarkMode");
  document.body.classList.remove("forcedLightMode");
  document.cookie = "colorMode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

document.addEventListener("mousedown", () => {
  if (!audioLoaded) {
    document.querySelector("#one_beep").load();
    document.querySelector("#two_beep").load();
  }
  audioLoaded = true;
});

document.addEventListener("touchstart", () => {
  if (!audioLoaded) {
    document.querySelector("#one_beep").load();
    document.querySelector("#two_beep").load();
  }
  audioLoaded = true;
});

document.addEventListener("click", click => {
  let clickedElement = click.target;

  if (clickedElement.id && clickedElement.classList.contains("icon")) {
    if (window.matchMedia("(hover: none)").matches) {
      document.querySelector("#center-container").classList.remove("tapped");
    }

    if (!document.querySelector("#title").classList.contains("hide")) {
      document.querySelector("#title").classList.add("hide");
      document.querySelector("#center-container").classList.add("hide");
      document.querySelector(`#memories div.${clickedElement.id}`).classList.remove("hide");
      document.querySelector("#footer p").innerHTML = "click anywhere to go back";
    }

  } else {
    if (clickedElement === document.querySelector("#color-mode img")) {
      switchColorMode();
    } else if (clickedElement === document.querySelector("#footer p")) {
      if (!document.querySelector("#note-container").classList.contains("hide")) {
        document.querySelector("#center-container").classList.remove("hide");
        document.querySelector("#footer p").innerHTML = "view my notes.md";
        document.querySelector("#note-container").classList.add("hide");
        document.querySelector("#color-mode").classList.remove("hide");
      } else if (document.querySelector("#title").classList.contains("hide")) {
        document.querySelector("#footer p").innerHTML = "view my notes.md";
        document.querySelector("#title").classList.remove("hide");
        document.querySelector("#center-container").classList.remove("hide");
        document.querySelectorAll("#memories > div").forEach(element => {
          element.classList.add("hide")
        });
      } else {
        document.querySelector("#note-container").scrollTop = 0;
        document.querySelector("#center-container").classList.add("hide");
        document.querySelector("#footer p").innerHTML = "back to home";
        document.querySelector("#note-container").classList.remove("hide");
        document.querySelector("#color-mode").classList.add("hide");
      }
    } else {
      if (document.querySelector("#title").classList.contains("hide") && !Array.from(document.querySelectorAll("#memories .name, #memories .big-logo, #memories .big-logo img, #memories .words p")).includes(clickedElement)) {
        document.querySelector("#footer p").innerHTML = "view my notes.md";
        document.querySelector("#title").classList.remove("hide");
        document.querySelector("#center-container").classList.remove("hide");
        document.querySelectorAll("#memories > div").forEach(element => {
          element.classList.add("hide")
        });
      } else {
        if (isInRect(click.clientX, click.clientY) && window.matchMedia("(hover: none)").matches && !document.querySelector("#center-container").classList.contains("tapped") && !document.querySelector("#center-container").classList.contains("hide")) {
          document.querySelector("#center-container").classList.add("tapped");
        } else if (window.matchMedia("(hover: none)").matches && document.querySelector("#center-container").classList.contains("tapped") && !document.querySelector("#center-container").classList.contains("hide")) {
          document.querySelector("#center-container").classList.remove("tapped");
        }
      }
    }
  }
});
