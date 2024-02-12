import compromise from 'compromise';





export class ChatBot {

  constructor() {
    this.questionAndAnswer = {};
  }

  // check if the user is asking a question and we have the answer for it
  processMessage(message) {
    const doc = compromise(message);
    const questions = doc.questions().out('array');
    for (let question of questions) {
      if (this.questionAndAnswer[question]) {
        return this.questionAndAnswer[question];
      }
    }
    return null;
  }

  // add a question and answer to the bot
  addQuestionAndAnswer(question, answer) {
    this.questionAndAnswer[question] = answer;
  }

}