const React = require('react');

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.action = this.props.action;
    this.state = { channels: [] };
    this.store.on("CHANGE", ()=> {
      this.setState({
        channels: this.store.getChannels(),
        selectedChannel: this.store.getSelectedChannel()
      });
    })
  }

  render() {
    return(
      <select ref="channel" onChange={this.onChangeHandler.bind(this)}>
        <option key={-1} value={this.store.getDefaultChannel()}>
          {this.store.getDefaultChannel()}
        </option>
        {this.channelDoms()}
      </select>
    );
  }

  channelDoms() {
    return this.state.channels.map((e, i)=> {
      return (
        <option key={i} value={e.name}>
          {e.name}
        </option>
      )
    })
  }

  onChangeHandler() {
    let channel = this.refs.channel;
    this.action.changeSelectedChannel(channel.value);
  }
}

module.exports = ChannelList
