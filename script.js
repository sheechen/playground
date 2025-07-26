import { UI } from "./questions.js";

let currentQuestion = 0;
let currentPoints = 0;
let totalQues = 10;

// question array
let question = [];
let copy = UI.slice();

for (let i = 0; i < totalQues; i++) {
  let randomIndex = Math.floor(Math.random() * copy.length);
  question.push(copy[randomIndex]);
  copy.splice(randomIndex, 1);
}

$(document).ready(function () {
  refresh();
});

function refresh() {
  $(".next").hide();
  $(".history-container").hide();
  $(".question").show();
  $(".sum").hide();
  $(".options-grid").show();
  //points
  var $points = $("#points");
  $points.html("Points: " + currentPoints);
  //num question
  var numQues = 0;
  numQues++;
  var $numQues = $("#numQues");
  $numQues.html("Current Question: " + numQues + " / " + totalQues);
  //question
  var $question = $(".question");
  $question.html(question[currentQuestion]["question"]);
  $(".option").each(function (index) {
    $(this).html(question[currentQuestion]["options"][index]);
  });
}

function answer(i) {
  question[currentQuestion]["selectedAnswer"] = i;
  if (i == question[currentQuestion]["answer"]) {
    correct();
    question[currentQuestion]["isCorrect"] = true;
  } else {
    wrong();
    question[currentQuestion]["isCorrect"] = false;
  }
}

function wrong() {
  $(".options-grid").hide();
  $(".question").hide();
  $(".sum").show();
  $(".sum").html(
    "Wrong ! Answer is " +
      question[currentQuestion]["options"][
        question[currentQuestion]["answer"] - 1
      ]
  );
  $(".next").show();
}

function correct() {
  $(".options-grid").hide();
  $(".question").hide();
  $(".sum").show();
  $(".sum").html("Correct !");
  currentPoints++;
  $(".next").show();
}

function nextQuestion() {
  if (question[currentQuestion]["numQues"] != totalQues) {
    currentQuestion++;
    refresh();
  } else {
    finished();
  }
}

function finished() {
  $(".quiz-container").hide();
  $("#points").hide();
  $("#numQues").hide();
  $(".next").hide();
  $(".summary").html("You get " + currentPoints + " points for this Quiz");
  history();
}

function history() {
  $(".history").html("HISTORY");
  $(".his").css("border", "2px solid white");

  for (let i = 0; i < question.length; i++) {
    let qText = `<p><strong>Q${question[i].numQues}:</strong> ${question[i].question}</p>`;
    let userAnswer =
      question[i].options[question[i].selectedAnswer - 1] || "Not answered";
    let correctAnswer = question[i].options[question[i].answer - 1];

    let answerInfo = `<p>Your answer: ${userAnswer}<br>Correct answer: ${correctAnswer}</p>`;

    $(".his").append(`<div>${qText}${answerInfo}</div><hr>`);
  }
}



