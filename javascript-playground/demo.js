// An array is a special variable, which can hold more than one value at a time.
// Understanding the difference between let & var: It can be said that a variable declared with var is defined throughout the program (function scoped) as compared to let (which is block scoped). A function can contain many blocks.
// watch later: https://www.youtube.com/watch?v=XgSjoHgy3Rk

let namesArray = ['Kevin','McCoy','Emily','Frederic','Alisha','Ashli','Simon','Ty','Fiona','Prismo','Sammy','Caroline','Francesca','Karl','Esther','Irene','Martin','Yanxin','Katrina','Kiana'];

function getRandom(amount) {
  return Math.floor(Math.random() * Math.floor(amount));
}

console.log(namesArray[getRandom(namesArray.length)]);

function getRandomName(names) {
  return names[Math.floor(Math.random() * Math.floor(names.length))];
}

let namesInString = namesArray.join(", ");

let randomName = getRandomName(namesArray);

document.querySelector("#name").innerHTML = randomName;

document.querySelector("#names").innerHTML = namesInString;

console.log(randomName);

console.log(namesArray);

console.log(namesInString);
