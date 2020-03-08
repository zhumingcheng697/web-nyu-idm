// let alt_text_element = document.querySelector("#alt_text");
let center_container_element = document.querySelector("#center-container");
// let parsedSelectedElement = "";
// let currentSmallestOrder = -1;
let xCord, yCord, startTime;
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

function showIcons() {
  if (window.matchMedia("(hover: none)").matches && !document.querySelector("#center-container").classList.contains("tapped")) {
    document.querySelector("#center-container").classList.add("tapped");
  } else if (window.matchMedia("(hover: none)").matches && document.querySelector("#center-container").classList.contains("tapped")) {
    document.querySelector("#center-container").classList.remove("tapped");
  }
}

function footerClick() {
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
}

/*
function deselect() {
  // alt_text.className = "default-alt_text";
  // if (alt_text_element.innerHTML !== "This is where the image goes.") {
  //   alt_text_element.innerHTML = "You have not selected anything.";
  // }
  document.querySelector("#title").classList.remove("hide");
  document.querySelector("#footer").classList.remove("hide");
  document.querySelector("#color-mode").classList.remove("hide");
  center_container_element.parentNode.style.overflow = "visible";
  center_container_element.style.transform = "translate(0%, 0%)";

  if (window.matchMedia("(hover: none)").matches) {
    document.querySelector("#center-container").classList.remove("tapped");
  }
}
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
  if (document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused) {
    xCord = mousedown.screenX;
    yCord = mousedown.screenY;
    shouldPlay = true;
    startTime = new Date();
  }
});

document.querySelector("#metro-card-container").addEventListener("touchstart", touchstart => {
  if (touchstart.touches.length === 1 && document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused) {
    xCord = touchstart.touches[0].screenX;
    yCord = touchstart.touches[0].screenY;
    shouldPlay = true;
    startTime = new Date();
  }
});

document.addEventListener("mouseup", mouseup => {
  if (document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused && shouldPlay) {
    let shouldWork;
    if (xCord - mouseup.screenX >= 80 && Math.abs(yCord - mouseup.screenY) <= 40 && (new Date()).valueOf() - startTime.valueOf() <= 1000 && (new Date()).valueOf() - startTime.valueOf() >= 200) {
      shouldWork = (Math.random() <= 0.9);
    } else if (Math.abs(xCord - mouseup.screenX) <= 30 && Math.abs(yCord - mouseup.screenY) <= 20) {
      shouldPlay = false;
      return;
    } else {
      shouldWork = false;
    }

    let playPromise = document.querySelector(shouldWork ? "#one_beep" : "#two_beep").play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        alert(shouldWork ? `Paid $2.75\nBal $${(2.7 - Math.random()*0.5).toFixed(2)}`.toUpperCase() : "Please swipe again".toUpperCase());
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
    if (xCord - touchend.changedTouches[0].screenX >= 80 && Math.abs(yCord - touchend.changedTouches[0].screenY) <= 40 && (new Date()).valueOf() - startTime.valueOf() <= 1000 && (new Date()).valueOf() - startTime.valueOf() >= 200) {
      shouldWork = (Math.random() <= 0.9);
    } else if (Math.abs(xCord - touchend.changedTouches[0].screenX) <= 30 && Math.abs(yCord - touchend.changedTouches[0].screenY) <= 20) {
      shouldPlay = false;
      return;
    } else {
      shouldWork = false;
    }

    let playPromise = document.querySelector(shouldWork ? "#one_beep" : "#two_beep").play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        alert(shouldWork ? `Paid $2.75\nBal $${(2.7 - Math.random()*0.5).toFixed(2)}`.toUpperCase() : "Please swipe again".toUpperCase());
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

  // if (document.querySelector("#title").classList.contains("hide")) {
  //   document.querySelector("#title").classList.remove("hide");
  //   // document.querySelector("#footer").classList.remove("hide");
  //   document.querySelector("#center-container").classList.remove("hide");
  //   document.querySelectorAll("#memories > div").forEach(element => {
  //     element.classList.add("hide")
  //   });
  // }

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

    /*
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

    */

  } else {
    if (clickedElement === document.querySelector("#color-mode img")) {
      switchColorMode();
    } else {
      if (document.querySelector("#title").classList.contains("hide") && !Array.from(document.querySelectorAll("#memories .name, #memories .big-logo, #memories .big-logo img, #memories .words p")).includes(clickedElement)) {
        document.querySelector("#footer p").innerHTML = "view my notes.md";
        document.querySelector("#title").classList.remove("hide");
        document.querySelector("#center-container").classList.remove("hide");
        document.querySelectorAll("#memories > div").forEach(element => {
          element.classList.add("hide")
        });
      }

      if (window.matchMedia("(hover: none)").matches && document.querySelector("#center-container").classList.contains("tapped")) {

        while (clickedElement) {
          if (document.querySelector("#center-container") === clickedElement) {
            return;
          } else {
            clickedElement = clickedElement.parentNode;
          }
        }

        document.querySelector("#center-container").classList.remove("tapped");
      }
    }
  }

  /*
  // if (document.querySelector("#note-container").classList.contains("hide") && clickedElement.parentNode && clickedElement.parentNode.id !== "footer") {
  //   while (clickedElement) {
  //     if (document.querySelector("#center-container") === clickedElement) {
  //       return;
  //     } else {
  //       clickedElement = clickedElement.parentNode;
  //     }
  //   }
  //
  //   deselect();
  // }

  // for (icon of document.querySelectorAll("div.icon")) {
  //   icon.classList.remove("big-margin");
  // }
  // parsedSelectedElement = "";
  */
});
