import { UI } from "./list_question.js";

//view question
document.getElementById("questionsList").innerHTML = UI.map((q, index) => {
  const optionsList = q.options
    .map((option, i) => {
      const isCorrect = i === q.answer;
      return `<p style="color: ${isCorrect ? "green" : "red"}">${option}${
        isCorrect ? " (Correct Answer)" : ""
      }</p>`;
    })
    .join("");

  return `
    <div class="question-item">
      <h3>Q${index + 1}: ${q.question}</h3>
      <ul>${optionsList}</ul>
    </div>
  `;
}).join("");