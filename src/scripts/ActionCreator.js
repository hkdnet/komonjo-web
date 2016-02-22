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
  changeIsSearchingChannel(data) {
    this.dispatcher.emit("changeIsSearchingChannel", data);
  }
  changeChannelSearchKeyword(data) {
    this.dispatcher.emit("changeChannelSearchKeyword", data);
  }
}

module.exports = ActionCreator
