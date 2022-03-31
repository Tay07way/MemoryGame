const gameContainer = document.getElementById("game");

const BAGS = [
  {
    name: "chanel",
    class: "chanel",
    image: "./images/chanel.jpeg",
  },
  {
    name: "dior",
    class: "dior",
    image: "./images/dior.jpeg",
  },
  {
    name: "fendi",
    class: "fendi",
    image: "./images/fendi.jpeg",
  },
  {
    name: "telfar",
    class: "telfar",
    image: "./images/telfar.jpeg",
  },
  {
    name: "prada",
    class: "prada",
    image: "./images/prada.jpeg",
  },
  {
    name: "chanel",
    class: "chanel",
    image: "./images/chanel.jpeg",
  },
  {
    name: "dior",
    class: "dior",
    image: "./images/dior.jpeg",
  },
  {
    name: "fendi",
    class: "fendi",
    image: "./images/fendi.jpeg",
  },
  {
    name: "telfar",
    class: "telfar",
    image: "./images/telfar.jpeg",
  },
  {
    name: "prada",
    class: "prada",
    image: "./images/prada.jpeg",
  },
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledBags = shuffle(BAGS);
let activeBags = [];
let pendingBags = [];

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForBags(bagArray) {
  for (let bag of bagArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const newImg = document.createElement("img");
    newImg.src = bag.image;
    newImg.alt = bag.name;
    newImg.classList.add(bag.class);
    newImg.classList.add("inactive");
    newDiv.appendChild(newImg);
    // give it a class attribute for the value we are looping over

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  let bag = event.target;

  if (bag.classList.contains("pending")) {
    console.log("already clicked...");
  } else {
    bag.classList = "pending";
    pendingBags.push(bag.alt);

    if (pendingBags.length > 1) {
      if (bag.alt == pendingBags[0]) {
        let matches = document.getElementsByClassName("pending");
        activeBags.push(matches);

        matches[1].classList = "active";
        matches[0].classList = "active";

        pendingBags = [];
        console.log("Match!");
      } else {
        let noMatches = document.getElementsByClassName("pending");

        noMatches[1].classList = "inactive";
        noMatches[0].classList = "inactive";

        pendingBags = [];
        console.log("Fail!");
      }
    }
    console.log("count: " + activeBags.length);
  }
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", bag);
  if (activeBags.length == 5) {
    setTimeout(function () {
      alert("CONGRATULATIONS, You Win!");
      resetGame();
    }, 1000);
  }
}

function resetGame() {
  let bags = document.getElementsByClassName("active");
  for (let i = 0; i < bags.length; i++) {
    bags[i].classList = "inactive";
  }
  activeBags = [];
  gameContainer.innerHTML = "";
  let shuffledBags = shuffle(BAGS);
  createDivsForBags(shuffledBags);
}

// when the DOM loads
createDivsForBags(shuffledBags);
