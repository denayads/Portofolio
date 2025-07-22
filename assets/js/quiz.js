let questions = {};
let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreText = document.getElementById("score-text");

// Load questions from external JSON
fetch("assets/json/questions.json")
  .then((res) => res.json())
  .then((data) => {
    questions = data;
  })
  .catch((err) => {
    alert("Failed to load questions.json!");
    console.error(err);
  });

function startQuiz() {
  currentCategory = document.getElementById("category-select").value;
  currentQuestionIndex = 0;
  score = 0;

  startScreen.style.display = "none";
  questionScreen.style.display = "block";

  showQuestion();
}

function showQuestion() {
  const q = questions[currentCategory][currentQuestionIndex];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.onclick = () => selectOption(btn, q.answer);
    optionsContainer.appendChild(btn);
  });
}

function selectOption(button, correctAnswer) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn) => (btn.disabled = true));

  if (button.textContent === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons.forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  const questionSet = questions[currentCategory];

  if (currentQuestionIndex < questionSet.length) {
    showQuestion();
  } else {
    questionScreen.style.display = "none";
    resultScreen.style.display = "block";
    scoreText.textContent = `You scored ${score} out of ${questionSet.length}!`;
  }
}

function restartQuiz() {
  resultScreen.style.display = "none";
  startScreen.style.display = "block";
}
