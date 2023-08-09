


const questions = [
  {
    image: "Alakazam.jpg",
    correct_option: "Alakazam",
  },
  {
    image: "Arcanine.jpg",
    correct_option: "Arcanine",
  },
  {
    image: "Bulbasaur.jpg",
    correct_option: "Bulbasaur",
  },
  {
    image: "Cubone.jpg",
    correct_option: "Cubone",
  },
  {
    image: "Ditto.jpg",
    correct_option: "Ditto",
  },
  {
    image: "Gloom.jpg",
    correct_option: "Gloom",
  },
  {
    image: "Gyarados.jpg",
    correct_option: "Gyarados",
  },
  {
    image: "Hitmonlee.jpg",
    correct_option: "Hitmonlee",
  },
  {
    image: "Horsea.jpg",
    correct_option: "Horsea",
  },
  {
    image: "Koffing.jpg",
    correct_option: "Koffing",
  },
  {
    image: "Mewtwo.jpg",
    correct_option: "Mewtwo",
  },
  {
    image: "Seaking.jpg",
    correct_option: "Seaking",
  },
  {
    image: "Tauros.jpg",
    correct_option: "Tauros",
  },
  {
    image: "Venonat.jpg",
    correct_option: "Venonat",
  },
  {
    image: "Victreebe.jpg",
    correct_option: "Victreebe",
  },
  {
    image: "eevee.jpg",
    correct_option: "Eevee",
  },
];


const optionsArray = [
  "Alakazam",
  "Arcanine",
  "Bulbasaur",
  "Cubone",
  "Ditto",
  "Gloom",
  "Gyarados",
  "Hitmonlee",
  "Horsea",
  "Koffing",
  "Mewtwo",
  "Pikachu",
  "Seaking",
  "Tauros",
  "Venonat",
  "Victreebe",
  "eevee",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
];
const container = document.querySelector(".container");
const gameContainer = document.querySelector(".game-container");
const startButton = document.getElementById("start");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
let timer = document.getElementsByClassName("timer")[0];
let nextBtn;
let score, currentQuestion, finalQuestions;
let countdown,
  count = 11;


const randomValueGenerator = (array) =>
  array[Math.floor(Math.random() * array.length)];


const randomShuffle = (array) => array.sort(() => 0.5 - Math.random());


const startGame = () => {
  
  scoreContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
  finalQuestions = populateQuestions();
  score = 0;
  currentQuestion = 0;
  
  cardGenerator(finalQuestions[currentQuestion]);
};


const timerDisplay = () => {
  countdown = setInterval(() => {
    count -= 1;
    timer.innerHTML = `<span>Tempo restante: </span>${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      nextQuestion();
    }
  }, 1000);
};


const populateOptions = (correct_option) => {
  let arr = [];
  arr.push(correct_option);
  let optionsCount = 1;
  while (optionsCount < 4) {
    let randomvalue = randomValueGenerator(optionsArray);
    if (!arr.includes(randomvalue)) {
      arr.push(randomvalue);
      optionsCount += 1;
    }
  }
  return arr;
};


const populateQuestions = () => {
  let questionsCount = 0;
  let chosenObjects = [];
  let questionsBatch = [];

  while (questionsCount < 5) {
    let randomvalue = randomValueGenerator(questions);
    let index = questions.indexOf(randomvalue);
    if (!chosenObjects.includes(index)) {
      questionsBatch.push(randomvalue);
      chosenObjects.push(index);
      questionsCount += 1;
    }
  }
  return questionsBatch;
};


const checker = (e) => {
  let userSolution = e.target.innerText;
  let options = document.querySelectorAll(".option");
  if (userSolution === finalQuestions[currentQuestion].correct_option) {
    e.target.classList.add("correct");
    score++;
  } else {
    e.target.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == finalQuestions[currentQuestion].correct_option) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
};


const nextQuestion = (e) => {
 
  currentQuestion += 1;
  if (currentQuestion == finalQuestions.length) {
    gameContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    startButton.innerText = `Restart`;
    userScore.innerHTML =
      "Sua pontuação foi " + score + " de " + currentQuestion;
    clearInterval(countdown);
  } else {
    cardGenerator(finalQuestions[currentQuestion]);
  }
};


const cardGenerator = (cardObject) => {
  const { image, correct_option } = cardObject;
  let options = randomShuffle(populateOptions(correct_option));
  container.innerHTML = `<div class="quiz">
  <p class="num">
  ${currentQuestion + 1}/5
  </p>
  <div class="questions">
    <img class="pokemon-image" src="${image}"/>
  </div>
    <div class="options">
    <button class="option" onclick="checker(event)">${options[0]}
    </button>
    <button class="option" onclick="checker(event)">${options[1]}
    </button>
    <button class="option" onclick="checker(event)">${options[2]}
    </button>
    <button class="option" onclick="checker(event)">${options[3]}
    </button>
    </div>

    <div class="nxt-btn-div">
        <button class="next-btn" onclick="nextQuestion(event)">Próximo</button>
    </div>

  </div>`;

  count = 11;
  clearInterval(countdown);
 
  timerDisplay();
};

startButton.addEventListener("click", startGame);
