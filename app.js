const rules = document.getElementsByClassName("rules-btn");
const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const closeBtn = document.getElementById("close");
const choices = document.getElementById("choices");
const choicesBtn = document.getElementsByClassName("choices-btn");
const results = document.getElementById("results");
const [result] = document.getElementsByClassName("result");
const [score] = document.getElementsByClassName("score");
const [resultTop] = document.getElementsByClassName("result-top");
const [playAgain] = document.getElementsByClassName("result-btn");
let points = 0;

const allChoices = ["scissors", "spock", "paper", "lizard", "rock"];

rules[0].addEventListener("click", () => {
  backdrop.classList.add("active");
  modal.classList.add("active");
});

const closeModal = () => {
  backdrop.classList.remove("active");
  modal.classList.remove("active");
};

closeBtn.addEventListener("click", () => {
  closeModal();
});
backdrop.addEventListener("click", () => {
  closeModal();
});

const setChoices = (value, i, result) => {
  result.attributes.choice.nodeValue = value;
  result.attributes.choice.value = value;
  result.children[i].classList.remove("not-to-be-shown");
  result.children[i].classList.add(value);
  result.children[
    i
  ].children[0].attributes.src.value = `./images/icon-${value}.svg`;
  result.children[i].children[0].attributes.alt.value = value;
};

const winnerDecision = (win1, win2, computerChoice) => {
  if (computerChoice == win1 || computerChoice == win2) {
    points++;
    score.innerText = points;
    results.children[1].classList.add("winner");
    result.children[0].innerText = "YOU WIN";
  } else {
    points--;
    score.innerHTML = points;
    results.children[5].classList.add("winner");
    result.children[0].innerText = "YOU LOSE";
  }
};

const winner = (player, computer) => {
  const playerChoice = player.attributes.choice.value;
  const computerChoice = computer.attributes.choice.value;

  results.classList.add("show-winner");
  if (computerChoice == playerChoice) {
    result.children[0].innerText = "DRAW";
  } else if (playerChoice == "scissors")
    winnerDecision("paper", "lizard", computerChoice);
  else if (playerChoice == "paper")
    winnerDecision("rock", "spock", computerChoice);
  else if (playerChoice == "rock")
    winnerDecision("lizard", "scissors", computerChoice);
  else if (playerChoice == "lizard")
    winnerDecision("spock", "paper", computerChoice);
  else if (playerChoice == "spock")
    winnerDecision("rock", "scissors", computerChoice);
};

const userChoice = (value, htmlTag) => {
  choices.style.display = "none";
  results.style.display = "grid";
  setChoices(value, 0, results.children[1]);
  setTimeout(() => {
    const index = Math.floor(Math.random() * 5);
    const value1 = allChoices[index];
    setChoices(value1, 0, results.children[5]);
    winner(results.children[1], results.children[5]);
  }, 500);
};

for (let i = 0; i < choicesBtn.length; i++) {
  choicesBtn[i].addEventListener("click", () => {
    userChoice(choicesBtn[i].attributes.choice.value, choicesBtn[i]);
  });
}
const resultClassCleaner = (result) => {
  result.attributes.choice.nodeValue = "";
  result.attributes.choice.value = "";
  result.children[0].removeAttribute("class");
  result.children[0].children[0].attributes.src.value = "";
  result.children[0].children[0].attributes.alt.value = "";
};

playAgain.addEventListener("click", () => {
  results.children[1].classList.remove("winner");
  results.children[5].classList.remove("winner");
  choices.style.display = "grid";
  results.style.display = "none";
  results.classList.remove("show-winner");
  resultClassCleaner(results.children[1]);
  resultClassCleaner(results.children[5]);
  results.children[5].children[0].classList.add("not-to-be-shown");
});
