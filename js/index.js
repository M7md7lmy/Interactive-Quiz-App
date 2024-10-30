// API
// https://opentdb.com/api.php?amount=10&category=13&difficulty=easy&type=multiple

// import JS file
import { Quiz } from "./quiz.js";
import { Question } from "./question.js";
// HTML Elements
const categoryMenu = document.getElementById("categoryMenu");
const difficultyOptions = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const startBtn = document.getElementById("startQuiz");
const quizForm = document.getElementById("quizOptions");

// ?==========> App Variables
export let questions;
export let quiz;
export const questionsContainer = document.querySelector(
  ".questions-container"
);
//   HTML Event
startBtn.addEventListener("click", async function () {
  const category = categoryMenu.value;
  const difficulty = difficultyOptions.value;
  const number = questionsNumber.value;
  quiz = new Quiz(category, difficulty, number);
  questions = await quiz.getQuestions(); // Promise
  console.log(questions);

  const question = new Question(0);
  // Hide Form
  quizForm.classList.replace("d-flex", "d-none");
  // display Question 1
  question.displayQuestion();
});
