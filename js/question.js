import { questions, quiz, questionsContainer } from "./index.js";

export class Question {
  constructor(index) {
    // get values from API
    this.question = questions[index].question;
    this.category = questions[index].category;
    this.difficulty = questions[index].difficulty;
    this.answer = questions[index].correct_answer;
    this.wrongChoices = questions[index].incorrect_answers;
    this.index = index;
    this.allAnswers = this.getChoicesReady();
    this.answered = false;
  }

  // we make this function to change answer places
  getChoicesReady() {
    return this.wrongChoices.concat(this.answer).sort();
  }
  displayQuestion() {
    const questionHTML = `
    <div class="question shadow-lg col-lg-6 offset-lg-3 p-4 rounded-3 d-flex flex-column justify-content-center">
    <div class = "w-100 d-flex justify-content-between">
    <span class="btn btn-category">${this.category}</span>
    <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    } Questions</span>
    </div>
    <h2 class="text-capitalize h4 text-center">${this.question}</h2>
    <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
    ${this.allAnswers
      .map((x) => {
        return `<li>${x}</li>`;
      })
      .join("")}
    </ul>
    <h2 class="text-cap italize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i>
    Score:${quiz.score}
    </h2>
    </div>
    `;
    questionsContainer.innerHTML = questionHTML;
    const allChoicesBtns = document.querySelectorAll(".question ul li");
    for (let i = 0; i < allChoicesBtns.length; i++) {
      allChoicesBtns[i].addEventListener("click", (e) => {
        this.checkAnswer(e);
      });
    }
  }
  checkAnswer(e) {
    if (!this.answered) {
      this.answered = true;
      if (e.target.innerHTML.toLowerCase() == this.answer.toLowerCase()) {
        e.target.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        );
        quiz.score += 1;
      } else {
        e.target.classList.add("wrong", "animate__animated", "animate__shakeX");
      }

      this.animateQuestion(e.target, 500);
    }
  }

  animateQuestion(element, duration) {
    setTimeout(() => {
      element
        .closest(".question")
        .classList.add("animate__animated", "animate__bounceOutLeft");
      setTimeout(() => {
        this.nextQuestion();
      }, duration);
    }, duration);
  }

  nextQuestion() {
    this.index += 1;
    if (this.index > questions.length - 1) {
      questionsContainer.innerHTML = quiz.endQuiz();
      const again = document.querySelector(".again");
      again.addEventListener("click", function () {
        location.reload();
      });
      return;
    }
    const x = new Question(this.index);
    x.displayQuestion();
  }
}
