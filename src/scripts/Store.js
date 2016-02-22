const EventEmitter  = require('events').EventEmitter;
const Client = require('./KomonjoClient.js');
const _ = require('lodash');

class Store extends EventEmitter {
  constructor(dispatcher) {
    super();

    /* constants */
    this.apiUrl = "http://192.168.99.100";
    this.defaultChannel = "";

    /* variables */
    this.channels = [];
    dispatcher.on("changeChannels", this.onChangeChannels.bind(this));
    this.selectedChannel = this.getDefaultChannel();
    dispatcher.on("changeSelectedChannel", this.onChangeSelectedChannel.bind(this));
    this.channelSearchKeyword = this.getDefaultChannel();
    dispatcher.on("changeChannelSearchKeyword", this.onChangeChannelSearchKeyword.bind(this));
    this.channelSearchSelectedIndex = 0;
    dispatcher.on("changeChannelSearchSelectedIndex", this.onChannelSearchSelectedIndex.bind(this));
    this.messages = [];
    dispatcher.on("changeMessages", this.onChangeMessages.bind(this));
    this.isWaitingMessage = false;
    dispatcher.on("changeIsWaitingMessages", this.onChangeIsWaitingMessage.bind(this));
    this.isSearchingChannel = false;
    dispatcher.on("changeIsSearchingChannel", this.onChangeIsSearchingChannel.bind(this));

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
    let keyword = this.getChannelSearchKeyword();
    let pattern = new RegExp(keyword.split('').join('(?:.*)'), 'i');
    return  _
      .chain(this.channels)
      .filter((channel)=> pattern.test(channel.name))
      .value();
  }
  onChangeChannels(channels) {
    this.channels = channels.map((name)=> {
      return { name: name }
    });
    this.emit("CHANGE");
  }
  getChannelSearchKeyword() {
    return this.channelSearchKeyword;
  }
  onChangeChannelSearchKeyword(keyword) {
    this.channelSearchKeyword = keyword;
    this.emit("CHANGE");
  }

  getChannelSearchSelectedIndex() {
    return this.channelSearchSelectedIndex;
  }
  onChannelSearchSelectedIndex(index) {
    this.channelSearchSelectedIndex = index;
    this.emit("CHANGE");
  }

  getSelectedChannel() {
    return this.selectedChannel;
  }
  onChangeSelectedChannel(channel) {
    this.selectedChannel = channel;
    if (!_.chain(this.getChannels())
          .map((e)=> e.name)
          .includes(this.selectedChannel)
          .value()) {
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

  getIsSearchingChannel() {
    return this.isSearchingChannel;
  }
  onChangeIsSearchingChannel(isSearchingChannel) {
    this.isSearchingChannel = isSearchingChannel;
    this.emit("CHANGE");
  }
}

module.exports = Store;
