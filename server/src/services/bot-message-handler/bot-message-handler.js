import { createIdFromText, isAnswerToQuestion, isAQuestion } from "../../utils/helper.js";
import { QuestionsAnswersRepository } from "../../repository/questions-answers-repository.js";


export class BotMessageHandler{
  #name;
  #questionsAndAnswersRepository;
  constructor(name) {
    this.#questionsAndAnswersRepository = new QuestionsAnswersRepository();
    this.#name = name;
  }


  #checkIfTextAnswersOpenQuestion(text){
    const unansweredQuestions = this.#questionsAndAnswersRepository.getAllOpenQuestions();
    for (const question of unansweredQuestions) {
      if(isAnswerToQuestion(question.question, text)) {
        question.answer = text;
        return "Got it! I will remember that for next time.";
      }
    }
    return "";
  }

  handleQuestions(text) {
    if (isAQuestion(text)) {
      const id = createIdFromText(text);
      const question = this.#questionsAndAnswersRepository.findOpenQuestionById(id);
      if (question) {
        if(question.answer !== null) {
          return question.answer;
        } else {
          return `I am still waiting for an answer to that question. I will let you know when I get one.`;
        }
      } else {
        this.#questionsAndAnswersRepository.saveOpenQuestion(id, text);
        return "I don't know what the answer for that question, Does someone else know?";
      }
    } else {
      this.#checkIfTextAnswersOpenQuestion(text);
    }
  }

  broadcastMessage(socket, connectionType ,message){
    socket.broadcast.emit(connectionType, {
      message: message,
      name: this.#name,
      date: Date.now(),
    });
  }

  sendPrivateMessage(socket, connectionType ,message){
    socket.emit(connectionType, {
      message: message,
      name: this.#name,
      date: Date.now(),
    });
  }
}