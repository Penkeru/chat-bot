

export class BotMessageHandler{
  constructor(name) {
    this.name = name;
  }

  broadcastMessage(socket, connectionType ,message){
    socket.broadcast.emit(connectionType, {
      message: message,
      name: this.name,
      date: Date.now(),
    });
  }

  sendPrivateMessage(socket, connectionType ,message){
    socket.emit(connectionType, {
      message: message,
      name: this.name,
      date: Date.now(),
    });
  }
}