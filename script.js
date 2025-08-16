import { UI } from "./list_question.js";

let currentQuestion = 0;
let currentPoints = 0;
const totalQues = 10;

let questions = [];
let copy = [...UI];

// Randomly pick 10 questions
for (let i = 0; i < totalQues; i++) {
  const randomIndex = Math.floor(Math.random() * copy.length);
  const q = copy.splice(randomIndex, 1)[0];
  q.numQues = i + 1; // Assign question number
  questions.push(q);
}

$(document).ready(() => {
  loadQuestion();
  $("#admin").click(() => {
    admin();
  });

  // Handle option click
  $(".option").click(function () {
    const optionIndex = parseInt($(this).data("option"));
    handleAnswer(optionIndex);
  });

  // Handle NEXT button
  $(".next").click(() => {
    nextQuestion();
  });
});

function loadQuestion() {
  $(".his, .history, .sum, .next").hide();
  $(".options-grid, .question").show();

  // Update header info
  $("#points").html(`Your Points: ${currentPoints}`);
  $("#numQues").html(`Current Question: ${currentQuestion + 1} / ${totalQues}`);

  const q = questions[currentQuestion];
  $(".question").html(q.question);

  $(".option").each((index, button) => {
    $(button).html(q.options[index]);
  });
}

function handleAnswer(selected) {
  const q = questions[currentQuestion];
  q.selectedAnswer = selected;

  const isCorrect = selected === q.answer + 1;
  q.isCorrect = isCorrect;

  if (isCorrect) {
    currentPoints++;
    $(".sum").html("Correct!");
  } else {
    const correctText = q.options[q.answer];
    $(".sum").html(`Wrong! Answer is ${correctText}`);
  }

  $(".options-grid, .question").hide();
  $(".sum, .next").show();
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < totalQues) {
    loadQuestion();
  } else {
    showSummary();
  }
}

//admin mode

$("#admin").html("Admin Mode");

function admin() {
  $(".quiz-container, .next, .points, .numQues").hide();
  $("#button").html("Quit Admin Mode");
  $(".sum").html("Admin Mode: Edit Questions");
  $(".UI").html(`
    <button class="add-question" onclick="addQuestion()">Add Question</button>
    <button class="edit-question" onclick="editQuestion()">Edit Question</button>
    <button class="delete-question" onclick="deleteQuestion()">Delete Question</button>
    <button class="quit-admin" onclick="quitAdmin()">Quit Admin Mode</button>
  `);
  $(".UI").show();
  $(".history").hide();
}

function quitAdmin() {
  $(".quiz-container, .next").show();
  $("#button").html("Admin Mode");
}

function showSummary() {
  $(".quiz-container, #points, #numQues, .next").hide();
  $(".summary").html(`You scored ${currentPoints} out of ${totalQues}`);
  renderHistory();
}

function renderHistory() {
  $(".history").show();
  const historyContainer = $(".history");
  historyContainer.empty();

  const header = $("<h2>").text("Quiz History");
  historyContainer.append(header);

  questions.forEach((q) => {
    const userAnswerIndex = q.selectedAnswer ? q.selectedAnswer - 1 : -1;
    const correctAnswerIndex = q.answer;

    const itemDiv = $("<div>")
      .addClass("history-item")
      .addClass(q.isCorrect ? "correct" : "incorrect");

    const questionElem = $("<p>")
      .addClass("history-question")
      .html(`<strong>Q${q.numQues}:</strong> ${q.question}`);

    itemDiv.append(questionElem);

    // List all options with highlights
    q.options.forEach((optionText, index) => {
      const optionElem = $("<p>").addClass("history-option").text(optionText);

      // Highlight correct answer
      if (index === correctAnswerIndex) {
        optionElem.css({
          "font-weight": "bold",
          color: "#00d675",
          "text-decoration": "underline",
        });
      }

      // Highlight user selected answer differently if incorrect
      if (index === userAnswerIndex && index !== correctAnswerIndex) {
        optionElem.css({
          color: "#ff4c4c",
          "font-weight": "bold",
        });
      }

      // If user selected the correct answer, it is already styled, so no extra needed

      itemDiv.append(optionElem);
    });

    historyContainer.append(itemDiv);
  });
}
