


export class ChatBot {

  constructor() {
    this.questionAndAnswer = {};
    this.activeUsersCount = 0;
  }

  onUserJoin(socket) {
    this.activeUsersCount++;
    socket.emit('message', {sender:'bot-message', text: `Online users in the chat: ${this.activeUsersCount}`});
    socket.emit('message', {sender:'bot-message', text: `Usage: Ask your question. Example: @chatbot {question}? \n 
    Usage: Teach me. Example: @chatbot {question}? {answer}`});
    socket.broadcast.emit('message', {sender:'bot-message', text: `Online users in the chat: ${this.activeUsersCount}`});
  }

  onUserLeave(socket) {
    this.activeUsersCount--;
    socket.broadcast.emit('message', {sender:'bot-message', text: `Online users in the chat: ${this.activeUsersCount}`});
  }

  checkIfChatBotQuestion(question) {
    return question.indexOf('@chatbot ') === 0 && question.indexOf('?') > 0;
  }

  handleMessage(message) {
      const question = message.substring(9, message.indexOf('?')).trim();
      const answer = message.substring(message.indexOf('?')+1).trim();
      if(this.questionAndAnswer[question]) {
        return this.questionAndAnswer[question];
      } else if(answer) {
        this.questionAndAnswer[question] = answer;
        return 'Thank you for teaching me something new! I will remember that for next time.';
      } else {
        return 'I am sorry but I don`t know the answer to that question yet';
      }
  }
}