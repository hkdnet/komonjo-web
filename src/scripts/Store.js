const EventEmitter  = require('events').EventEmitter;
const Client = require('./KomonjoClient.js')

class Store extends EventEmitter {
  constructor(dispatcher) {
    super();

    /* constants */
    this.apiUrl = "http://192.168.99.100";
    this.defaultChannel = "---";

    /* variables */
    this.channels = [];
    dispatcher.on("changeChannels", this.onChangeChannels.bind(this));
    this.selectedChannel = this.getDefaultChannel();
    dispatcher.on("changeSelectedChannel", this.onChangeSelectedChannel.bind(this));
    this.messages = [];
    dispatcher.on("changeMessages", this.onChangeMessages.bind(this));
    this.isWaitingMessage = false;
    dispatcher.on("changeIsWaitingMessages", this.onChangeIsWaitingMessage.bind(this));

    /* init */
    this.dispatcher = dispatcher;
    this.client = new Client(this.getApiUrl());
  }
  /* consts getter */
  getApiUrl() {
    return this.apiUrl;
  }
  getDefaultChannel() {
    return this.defaultChannel;
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
    if (channel === this.getDefaultChannel()) {
      this.dispatcher.emit("changeMessages", []);
      this.emit("CHANGE");
      return;
    }
    this.dispatcher.emit("changeIsWaitingMessages", true);
    this.client.messages(channel).done((data)=>{
      this.dispatcher.emit("changeMessages", data);
      this.dispatcher.emit("changeIsWaitingMessages", false);
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

  getIsWaitingMessage() {
    return this.isWaitingMessage;
  }
  onChangeIsWaitingMessage(isWaitingMessage) {
    this.isWaitingMessage = isWaitingMessage;
    this.emit("CHANGE");
  }
}

module.exports = Store;
