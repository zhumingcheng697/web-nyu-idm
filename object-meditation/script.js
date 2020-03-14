let xCord, yCord, pageY, startTime, timeOutId;
let shouldPlay = false;
let isAudioLoaded = false;
let isCookieWarned = false;
let isAutoPlayWarned = false;
let isSwipeGameEnabled = true;

let mapUrls = {
  "a-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48425.83799048653!2d-73.86529042260177!3d40.66041917933763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2677a7523cfa7%3A0x79cc1b3e74e8c478!2sHoward%20Beach%20-%20JFK%20Subway%20Station!5e0!3m2!1sen!2sus!4v1584129228905!5m2!1sen!2sus",
  "a-ii": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48402.72202310746!2d-74.0222981226008!3d40.692250679334045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a4b934481c7%3A0x4f37e8720aab325!2sJay%20St%20-%20MetroTech%20Station!5e0!3m2!1sen!2sus!4v1584129337347!5m2!1sen!2sus",
  "d-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48450.27810181782!2d-74.03184562260279!3d40.62674187934127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2453ae4d8bbbb%3A0x3a5726ca53856cf2!2s62%20Street%20Station!5e0!3m2!1sen!2sus!4v1584129888279!5m2!1sen!2sus",
  "f-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48350.44280245119!2d-74.01233232259862!3d40.7641652793263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f9fe99e63d%3A0xb399d392ada3b6b4!2s57%20Street!5e0!3m2!1sen!2sus!4v1584130074882!5m2!1sen!2sus",
  "g-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12091.164324861791!2d-73.95739093219512!3d40.74462237932838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25925b8fb086f%3A0x604e1e280275e3a!2s21%20Street-Van%20Alst%20Station!5e0!3m2!1sen!2sus!4v1584130146056!5m2!1sen!2sus",
  "r-i": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48375.28184105214!2d-74.02744223800518!3d40.7300101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599a4639db75%3A0xd4cdc6544e55f6d1!2s8%20Street%20Station!5e0!3m2!1sen!2sus!4v1584130179990!5m2!1sen!2sus",
  "r-ii": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48364.16468777156!2d-74.02375542259925!3d40.745299779328235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a6064b21ab%3A0xf2bf8d26d16d1dd5!2s28%20St%20Station!5e0!3m2!1sen!2sus!4v1584130219417!5m2!1sen!2sus",
  "two-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48360.512056218686!2d-74.02589230338631!3d40.750322294806544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ae920208d7%3A0x5dddd28335694755!2s34%20St%20-%20Penn%20Station!5e0!3m2!1sen!2sus!4v1584130285030!5m2!1sen!2sus",
  "two-ii": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48403.96841440805!2d-74.02003932260092!3d40.69053487933435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a4c9a84d941%3A0x6e86fa478512d5e4!2sHoyt%20St!5e0!3m2!1sen!2sus!4v1584130339516!5m2!1sen!2sus",
  "seven-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48357.30981930261!2d-73.88068118735873!3d40.7547250792259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25fde3aae177b%3A0x7e647a665f3bfcf1!2sMets%20-%20Willets%20Point!5e0!3m2!1sen!2sus!4v1584130379639!5m2!1sen!2sus",
  "seven-ii": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48357.1307444048!2d-74.03602732259894!3d40.75497127932725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259b47e534965%3A0xe8042bdbaeaf9f1!2s34%20St%20-%20Hudson%20Yds!5e0!3m2!1sen!2sus!4v1584130407055!5m2!1sen!2sus",
  "air-train-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48425.39892536457!2d-73.86459968736216!3d40.66102397923596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c26770851c3d6b%3A0xdd2cab0b7060855e!2sHoward%20Beach%20Station!5e0!3m2!1sen!2sus!4v1584130448218!5m2!1sen!2sus",
  "path-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48388.682050927564!2d-74.04647278736043!3d40.71157417923054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197b9fec67%3A0xdf170c5ccb9d0b00!2sWorld%20Trade%20Center!5e0!3m2!1sen!2sus!4v1584130591775!5m2!1sen!2sus",
  "path-ii": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48382.844581000165!2d-74.07766298736007!3d40.71960617922963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b20ff7fe13%3A0x50875f6c08c8e0c0!2sGrove%20Street%20Path%20Trains!5e0!3m2!1sen!2sus!4v1584130624004!5m2!1sen!2sus",
  "nj-transit-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48393.91000173279!2d-74.22571763736063!3d40.70437972923129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c252fad6718b57%3A0x134945e87e9ce02a!2sNewark%20Liberty%20International%20Airport!5e0!3m2!1sen!2sus!4v1584130705743!5m2!1sen!2sus",
  "nj-transit-ii": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48360.33337226613!2d-74.02853792259907!3d40.750567979327634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ae15b2adcb%3A0x7955420634fd7eba!2sPennsylvania%20Station!5e0!3m2!1sen!2sus!4v1584130788562!5m2!1sen!2sus",
  "amtrak-i": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46959.28713648861!2d-73.77631192253993!3d42.641104479169016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de09f3643e848f%3A0xf5cbdf5b36290c84!2sAlbany-Rensselaer!5e0!3m2!1sen!2sus!4v1584130814617!5m2!1sen!2sus",
  "amtrak-ii": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48360.33337226613!2d-74.02853792259907!3d40.750567979327634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ae15b2adcb%3A0x7955420634fd7eba!2sPennsylvania%20Station!5e0!3m2!1sen!2sus!4v1584130788562!5m2!1sen!2sus"
};

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
  document.body.classList.remove("forcedDarkMode", "forcedLightMode");
  document.body.classList.add(isInLightMode ? "forcedLightMode" : "forcedDarkMode");
  document.cookie = `colorMode=${isInLightMode ? "forcedLightMode" : "forcedDarkMode"}; path=/;`;
  document.querySelector("#color-mode").innerHTML = `<img src="assets/${isInLightMode ? `light` : `dark`}.png">`;
  if (!isCookieWarned && !document.cookie.includes("colorMode=forcedLightMode") && !document.cookie.includes("colorMode=forcedDarkMode")) {
    alert("Your browser has disabled cookies. Turn it on to explore all features.");
    isCookieWarned = true;
  }
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
*/

document.querySelectorAll("#footer p, div.icon, div.big-logo, #memories .words .station, #cancel").forEach(element => {
  element.addEventListener("touchstart", () => {
    element.classList.add("tapped");
  });
});

document.addEventListener("touchend", touchend => {
  document.querySelectorAll("#footer p, div.icon, div.big-logo, #memories .words .station, #cancel").forEach(element => {
    element.classList.remove("tapped");
  });
});

document.querySelector("#metro-card-container").addEventListener("mousedown", mousedown => {
  mousedown.preventDefault();
  if (isSwipeGameEnabled && isInRect(mousedown.clientX, mousedown.clientY)) {
    xCord = mousedown.clientX;
    yCord = mousedown.clientY;
    pageY = mousedown.pageY;
    document.body.classList.add("grabbing");
    shouldPlay = true;
    startTime = new Date();
  }
});

document.querySelector("#metro-card-container").addEventListener("touchstart", touchstart => {
  if (isSwipeGameEnabled && touchstart.touches.length === 1 && isInRect(touchstart.touches[0].clientX, touchstart.touches[0].clientY)) {
    xCord = touchstart.touches[0].clientX;
    yCord = touchstart.touches[0].clientY;
    pageY = touchstart.touches[0].pageY;
    shouldPlay = true;
    startTime = new Date();
  }
});

document.addEventListener("mouseup", mouseup => {
  document.body.classList.remove("grabbing");
  if (document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused && shouldPlay) {
    let shouldWork;
    if (xCord - mouseup.clientX >= 80 && Math.abs(yCord - mouseup.clientY) <= 40 && (new Date()).valueOf() - startTime.valueOf() <= 500 && Math.abs(Math.abs(pageY - mouseup.pageY) - Math.abs(yCord - mouseup.clientY)) <= 30 && (new Date()).valueOf() - startTime.valueOf() >= 200) {
      shouldWork = (Math.random() <= 0.9);
    } else if ((Math.abs(xCord - mouseup.clientX) <= 40 && Math.abs(yCord - mouseup.clientY) <= 20) || Math.abs(Math.abs(pageY - mouseup.pageY) - Math.abs(yCord - mouseup.clientY)) >= 10) {
      shouldPlay = false;
      return;
    } else {
      shouldWork = false;
    }

    let playPromise = document.querySelector(shouldWork ? "#one_beep" : "#two_beep").play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        alert(shouldWork ? `Paid $2.75\nBal $${(2.74 - Math.random()*0.07).toFixed(2)}`.toUpperCase() : "Please swipe again".toUpperCase());
      }).catch(() => {
        if (!isAutoPlayWarned) {
          alert("Your browser has disabled auto-play. Turn it on to explore all features.");
          isAutoPlayWarned = true;
        }
      });
    }
  }
  shouldPlay = false;
});

document.addEventListener("touchend", touchend => {
  if (touchend.changedTouches.length === 1 && document.querySelector("#one_beep").paused && document.querySelector("#two_beep").paused && shouldPlay) {
    let shouldWork;
    if (xCord - touchend.changedTouches[0].clientX >= 80 && Math.abs(yCord - touchend.changedTouches[0].clientY) <= 40 && Math.abs(Math.abs(pageY - touchend.changedTouches[0].pageY) - Math.abs(yCord - touchend.changedTouches[0].clientY)) <= 30 && (new Date()).valueOf() - startTime.valueOf() <= 500 && (new Date()).valueOf() - startTime.valueOf() >= 100) {
      shouldWork = (Math.random() <= 0.9);
    } else if ((Math.abs(xCord - touchend.changedTouches[0].clientX) <= 40 && Math.abs(yCord - touchend.changedTouches[0].clientY) <= 20) || Math.abs(Math.abs(pageY - touchend.changedTouches[0].pageY) - Math.abs(yCord - touchend.changedTouches[0].clientY)) >= 10) {
      shouldPlay = false;
      return;
    } else {
      shouldWork = false;
    }

    let playPromise = document.querySelector(shouldWork ? "#one_beep" : "#two_beep").play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        alert(shouldWork ? `Paid $2.75\nBal $${(2.74 - Math.random()*0.07).toFixed(2)}`.toUpperCase() : "Please swipe again".toUpperCase());
      }).catch(() => {
        if (!isAutoPlayWarned) {
          alert("Your browser has disabled auto-play. Turn it on to explore all features.");
          isAutoPlayWarned = true;
        }
      });
    }
  }
  shouldPlay = false;
});

window.matchMedia("(prefers-color-scheme: light)").addListener(match => {
  isInLightMode = match.matches;
  document.querySelector("#color-mode").innerHTML = `<img src="assets/${isInLightMode ? `light` : `dark`}.png">`;
  document.body.classList.remove("forcedLightMode", "forcedDarkMode");
  document.cookie = "colorMode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

document.addEventListener("mousedown", () => {
  if (!isAudioLoaded) {
    document.querySelector("#one_beep").load();
    document.querySelector("#two_beep").load();
  }
  isAudioLoaded = true;
});

document.addEventListener("touchstart", () => {
  if (!isAudioLoaded) {
    document.querySelector("#one_beep").load();
    document.querySelector("#two_beep").load();
  }
  isAudioLoaded = true;
});

document.addEventListener('keydown', key => {
  if (key.keyCode === 27) {
    if (!document.querySelector("#note-container").classList.contains("hide")) {
      document.querySelector("#center-container").classList.remove("hide");
      document.querySelector("#footer p").innerHTML = "view my notes.md";
      document.querySelector("#note-bg").classList.add("hide");
      document.querySelector("#note-container").classList.add("hide");
      document.querySelector("#color-mode").classList.remove("hide");
    } else if (document.querySelector("#title").classList.contains("hide")) {
      if (document.querySelector("#mask").classList.contains("hide")) {
        document.querySelector("#footer p").innerHTML = "view my notes.md";
        document.querySelector("#title").classList.remove("hide");
        document.querySelector("#center-container").classList.remove("hide");
        document.querySelectorAll("#memories > div").forEach(element => {
          element.classList.add("hide")
        });
      } else {
        timeOutId = setTimeout(() => { document.querySelector("#map").innerHTML = "" }, 500);
        document.querySelector("#mask").classList.add("hide");
        document.querySelector("#cancel").classList.add("hide");
        document.querySelector("#map-container").classList.add("hide");
      }
    }
  }
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
        document.querySelector("#note-bg").classList.add("hide");
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
        document.querySelector("#center-container").classList.add("hide");
        document.querySelector("#footer p").innerHTML = "back to home";
        document.querySelector("#note-bg").classList.remove("hide");
        document.querySelector("#note-container").classList.remove("hide");
        document.querySelector("#color-mode").classList.add("hide");
      }
    } else {
      if (document.querySelector("#title").classList.contains("hide")) {
        if (!Array.from(document.querySelectorAll("#memories .name, #memories .big-logo, #memories .big-logo img, #memories .words p, #memories .words .station, #cancel, #map-container, #map, #map iframe")).includes(clickedElement) && document.querySelector("#mask").classList.contains("hide")) {
          document.querySelector("#footer p").innerHTML = "view my notes.md";
          document.querySelector("#title").classList.remove("hide");
          document.querySelector("#center-container").classList.remove("hide");
          document.querySelectorAll("#memories > div").forEach(element => {
            element.classList.add("hide")
          });
        } else {
          if (clickedElement.classList.contains("station") && clickedElement.id && document.querySelector("#mask").classList.contains("hide")) {
            clearTimeout(timeOutId);
            document.querySelector("#map").innerHTML = "<iframe src=\"" + mapUrls[clickedElement.id] + "\" allowfullscreen></iframe>";
            document.querySelector("#mask").classList.remove("hide");
            document.querySelector("#cancel").classList.remove("hide");
            document.querySelector("#map-container").classList.remove("hide");
          } else {
            timeOutId = setTimeout(() => { document.querySelector("#map").innerHTML = "" }, 500);
            document.querySelector("#mask").classList.add("hide");
            document.querySelector("#cancel").classList.add("hide");
            document.querySelector("#map-container").classList.add("hide");
          }
        }
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
