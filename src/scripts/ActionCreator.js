class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  changeChannels(data) {
    this.dispatcher.emit("changeChannels", data);
  }
  changeSelectedChannel(data) {
    this.dispatcher.emit("changeSelectedChannel", data);
  }
}

module.exports = ActionCreator
