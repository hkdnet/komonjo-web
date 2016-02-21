const EventEmitter  = require('events').EventEmitter;
const Client = require('./KomonjoClient.js')

class Store extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.apiUrl = "http://192.168.99.100";
    this.channels = [];
    this.selectedChannel = "---";
    this.messages = [];
    this.client = new Client(this.getApiUrl());
    this.dispatcher = dispatcher;
    dispatcher.on("changeChannels", this.onChangeChannels.bind(this));
    dispatcher.on("changeSelectedChannel", this.onChangeSelectedChannel.bind(this));
    dispatcher.on("changeMessages", this.onChangeMessages.bind(this));
  }
  getApiUrl() {
    return this.apiUrl;
  }

  getChannels() {
    return this.channels;
  }
  onChangeChannels(channels) {
    this.channels = channels.map((name)=> {
      return { name: name }
    });
    this.emit("CHANGE");
  }

  getSelectedChannel() {
    return this.selectedChannel;
  }
  onChangeSelectedChannel(channel) {
    this.selectedChannel = channel;
    this.client.messages(channel).done((data)=>{
      this.dispatcher.emit("changeMessages", data)
    });
    this.emit("CHANGE");
  }

  getMessages() {
    return this.messages;
  }
  onChangeMessages(messages) {
    this.messages = messages;
    this.emit("CHANGE");
  }
}

module.exports = Store;
