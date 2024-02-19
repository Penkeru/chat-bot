import { createIdFromText, isAnswerToQuestion, isAQuestion } from "../../utils/helper.js";


export class BotMessageHandler{
  #questionsList;
  #name;
  constructor(name) {
    this.#questionsList = [];
    this.#name = name;
  }


  #addOpenQuestion(id, question){
    this.#questionsList.push({question, answer: null, id})
  }

  #findOpenQuestionById(id){
    return this.#questionsList.find(item => item.id === id) || null;
  }

  #getAllOpenQuestions(){
    return this.#questionsList.filter(question => question.answer === null);
  }

  #checkIfTextAnswersOpenQuestion(text){
    const unansweredQuestions = this.#getAllOpenQuestions();
    for (const question of unansweredQuestions) {
      if(isAnswerToQuestion(question.question, text)) {
        question.answer = text;
      }
    }
    return "";
  }

  handleQuestions(text) {
    if (isAQuestion(text)) {
      const id = createIdFromText(text);
      const question = this.#findOpenQuestionById(id);
      if (question) {
        if(question.answer !== null) {
          return question.answer;
        } else {
          return `I am still waiting for an answer to that question. I will let you know when I get one.`;
        }
      } else {
        this.#addOpenQuestion(id, text);
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