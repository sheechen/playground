let UI = [
    {
      question: "How old are you?",
      option: ["10","11","12","13"],
      answer: 3,
      skip: 0,
    },
    {
      question: "Have you eaten?",
      option: ["yes", "no", "later", "maybe"],
      answer: 3,
      skip: 0,
    },
    {
      question: "Are you a boy?",
      option: ["yes", "no", "not sure", "maybe"],
      answer: 3,
      skip: 0,
    },
    {
      question: "What is your heigth?",
      option: ["10","11","12","13"],
      answer: 3,
      skip: 0,
    },
    {
      question: "Do you like coding?",
      option: ["yes", "no", "later", "maybe"],
      answer: 3,
      skip: 0,
    },
    {
      question: "Is Debug Lab nice?",
      option: ["yes", "no", "later", "maybe"],
      answer: 3,
      skip: 0,
    },
    {
      question: "How long is your hair?",
      option: ["10","11","12","13"],
      answer: 3,
      skip: 0,
    },
    {
      question: "Can you jump?",
      option: ["yes", "no", "later", "maybe"],
      answer: 3,
      skip: 0,
    },
    {
      question: "Have you eaten?",
      option: ["yes", "no", "later", "maybe"],
      answer: 3,
      skip: 0,
    },
    {
      question: "Have you eaten?",
      option: ["yes", "no", "later", "maybe"],
      answer: 3,
      skip: 0,
    }
];
let currentQuestion = 0;
let currentPoints = 0;
let totalQues = UI.length;
let numQues = 0;

$(document).ready(function() {
  refresh();
});

function refresh(){
  //points
  var $points = $("#points");
  $points.html("Points: " + currentPoints);
  //num question
  var $numQues = $("#numQues");
  $numQues.html("Question Answered: " + numQues + " / " + totalQues);
  //question
  var $question = $("#question");
  $question.html(UI[currentQuestion]["question"]);
  $(".option").each(function(index){
    $(this).html(UI[currentQuestion]["option"][index]);
  });
}

function answer(i) {
  if (i == UI[currentQuestion]["answer"]) {
    alert("Correct answer.")
    currentPoints++;
    nextQuestion();
  } else {
    alert("Wrong answer.");
    nextQuestion();
  }
}

function nextQuestion() {
  if (currentQuestion < UI.length){
    numQues++;
    currentQuestion++;
    refresh();
  }
  else{
      $(".options-grid").hide();
      $("#question").html("You get 10 points for this");
  }
}
