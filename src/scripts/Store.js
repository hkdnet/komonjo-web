const EventEmitter  = require('events').EventEmitter;

class Store extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.channels = [];
    this.selectedChannel = "---";
    dispatcher.on("changeChannels", this.onChangeChannels.bind(this));
    dispatcher.on("changeSelectedChannel", this.onSelectedChannel.bind(this));
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
  onSelectedChannel(channel) {
    this.selectedChannel = channel;
    this.emit("CHANGE");
  }
}

module.exports = Store;
