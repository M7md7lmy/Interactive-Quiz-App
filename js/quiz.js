export class Quiz {
  constructor(category, difficulty, numberOfQuestion) {
    (this.category = category),
      (this.difficulty = difficulty),
      (this.numberOfQuestion = numberOfQuestion);
    this.score = 0;
  }
  async getQuestions() {
    let getApi = await fetch(
      `https://opentdb.com/api.php?amount=${this.numberOfQuestion}&category=${this.category}&difficulty=${this.difficulty}`
    );
    let data = await getApi.json();
    console.log(data.results);
    return data.results;
  }
  endQuiz() {
    return `
     <div class = "question shadow-lg-6 ofset-lg-3 p-4 rounded-3 d-flex flex-column justify-content-center">
     <h2 class="mb-2 p-3 text-center">
    ${
      this.score == this.numberOfQuestion
        ? "Congratulation"
        : `your score is : ${this.score} `
    }
     </h2>
     <button class="again btn btn-primary rounded pill"><i class="bi bi-arrow-repeat"></i> Try Again </button>
     </div>
     
     `;
  }
}
