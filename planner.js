var input = document.getElementById("newItem");
var button = document.getElementById("button");

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    button.click()
  }
});

var options = {month: "long", day: "numeric", year: "numeric"};
var optionsTwo = {weekday: "long"};
var date = new Date();

document.querySelector("h1").innerHTML =
  date.toLocaleDateString('en-US', optionsTwo)
  + "<br/>"
  + date.toLocaleDateString('en-US', options);

let plannerItems = [];
let backwardsArray = plannerItems.reverse();
// console.log(backwardsArray);

function createList() {
  for (var i = 0; i < backwardsArray.length; i++) {
    var plannerItem = backwardsArray[i].item;
    var nextItem = document.createElement("li");
    nextItem.innerHTML= plannerItem;
    var itemClass = backwardsArray[i].class;
    nextItem.classList = itemClass;
    nextItem.addEventListener("click", function(event) {
      crossOff(event.currentTarget);
    });
    // console.log(nextItem);
    document.getElementById("list").prepend(nextItem);

  };
};

function crossOff(item) {
  item.classList.toggle("strikethrough");
  var classList = item.classList.value;
  if (classList = "strikethrough") {
    penCross();
  }
  for (var i = 0; i < plannerItems.length; i++) {
    if (item.innerHTML === plannerItems[i].item) {
      plannerItems[i].class="strikethrough"
      // console.log(plannerItems[i]);
    };
  };
  document.getElementById("newItem").focus();
};

createList();


function newItem() {
  penSound();
  var newArray = document.getElementById("newItem").value;
  plannerItems.unshift({"item": newArray, "class": ""});
  // console.log(plannerItems[0]);
  const listNode = document.getElementById("list");
  while (listNode.children.length > 1 ) {
    listNode.removeChild(listNode.firstChild);
  };
  createList();
  var inputText = document.getElementById("newItem")
  inputText.value="";
  if (plannerItems.length > 12) {
    // console.log(plannerItems.length);
    document.querySelector("div.grid-div").style.height="1080px";
    document.querySelector("div.page").style.height="1000px";
    document.querySelector("div.pattern").style.height="92%";
  };
  document.getElementById("newItem").focus();
};

var penNoises = ["sounds/Pen1.wav", "sounds/Pen2.wav"];
var randomPen = Math.floor(Math.random()*penNoises.length);


function penSound() {
  var audio = new Audio(penNoises[Math.floor(Math.random()*penNoises.length)]);
  audio.volume = 0.1;
  audio.play();
};

function penCross() {
  var audio = new Audio("sounds/penCross1.wav");
  audio.play();
};
