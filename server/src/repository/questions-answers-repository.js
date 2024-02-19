

export class QuestionsAnswersRepository {
  #questionsAnswersLists = [];
  constructor() {
    if (!QuestionsAnswersRepository.instance) {
      QuestionsAnswersRepository.instance = this;
    }
    return QuestionsAnswersRepository.instance
  }

  saveOpenQuestion(id, question){
    this.#questionsAnswersLists.push({question, answer: null, id})
  }

  findOpenQuestionById(id){
    return this.#questionsAnswersLists.find(item => item.id === id) || null;
  }

  getAllOpenQuestions(){
    return this.#questionsAnswersLists.filter(question => question.answer === null);
  }
}