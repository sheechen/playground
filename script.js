let UI = [
  {
    numQues: 1,
    question: "What is the correct syntax to declare a JavaScript variable?",
    options: ["var = myVar;", "variable myVar;", "var myVar;", "v myVar =;"],
    answer: 3,
  },
  {
    numQues: 2,
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"],
    answer: 3,
  },
  {
    numQues: 3,
    question: "What will typeof null return in JavaScript?",
    options: ["\"null\"", "\"object\"", "\"undefined\"", "\"boolean\""],
    answer: 2,
  },
  {
    numQues: 4,
    question: "What is the result of 2 + \"2\" in JavaScript?",
    options: ["4", "\"22\"", "NaN", "undefined"],
    answer: 2,
  },
  {
    numQues: 5,
    question: "How do you write a comment in JavaScript?",
    options: ["<-- comment -->", "# comment", "// comment", "** comment **"],
    answer: 3,
  },
  {
    numQues: 6,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Boolean", "Undefined", "Float", "Object"],
    answer: 3,
  },
  {
    numQues: 7,
    question: "What will the following code output? console.log(0 == '0');",
    options: ["true", "false", "undefined", "NaN"],
    answer: 1,
  },
  {
    numQues: 8,
    question: "Which keyword is used to define a constant in JavaScript?",
    options: ["const", "constant", "define", "let"],
    answer: 1,
  },
  {
    numQues: 9,
    question: "What does the Array.prototype.map() method do?",
    options: [
      "Modifies the original array",
      "Filters elements based on a condition",
      "Creates a new array with results of a function on every element",
      "Joins array elements into a string"
    ],
    answer: 3,
  },
  {
    numQues: 10,
    question: "How do you check if a variable x is an array?",
    options: [
      "x.type === \"array\"",
      "x instanceof Array",
      "typeof x === \"array\"",
      "isArray(x)"
    ],
    answer: 2,
  }
];

let currentQuestion = 0;
let currentPoints = 0;
let totalQues = UI.length;

$(document).ready(function() {
  refresh();
});

function refresh(){
  $(".next").hide();
  $(".options-grid").show();
  //points
  var $points = $("#points");
  $points.html("Points: " + currentPoints);
  //num question
  var $numQues = $("#numQues");
  $numQues.html("Current Question: " + UI[currentQuestion]["numQues"] + " / " + totalQues);
  //question
  var $question = $(".question");
  $question.html(UI[currentQuestion]["question"]);
  $(".option").each(function(index){
    $(this).html(UI[currentQuestion]["options"][index]);
  });
}

function answer(i) {
  if (i == UI[currentQuestion]["answer"]) {
    correct();
  } else {
    wrong();
  }
}

function wrong() {
  $(".options-grid").hide();
  $(".question").html("Wrong ! Answer is " + UI[currentQuestion]["options"][UI[currentQuestion]["answer"]-1]);
  $(".next").show();
}

function correct() {
  $(".options-grid").hide();
  $(".question").html("Correct !");
  currentPoints++;
  $(".next").show();
}

function nextQuestion() {
  if (UI[currentQuestion]["numQues"] != totalQues) {
    currentQuestion++;
    refresh();
  } else {
    finished();
  }
}

function finished() {
  $(".options-grid").hide();
  $(".next").hide();
  $(".question").html("You get " + currentPoints + " points for this Quiz");
}