const React = require('react');

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.action = this.props.action;
    this.state = {
      channels: this.store.getChannels(),
      selectedChannel: this.store.getSelectedChannel(),
      isSearchingChannel: this.store.getIsSearchingChannel()
    };
    this.store.on("CHANGE", ()=> {
      this.setState({
        channels: this.store.getChannels(),
        selectedChannel: this.store.getSelectedChannel(),
        isSearchingChannel: this.store.getIsSearchingChannel()
      });
    })
  }

  render() {
    return(
      <div>
        <input ref="searchBox"
          onFocus={this.onSearchBoxFocusHandler.bind(this)}
          onChange={this.onSearchBoxChangeHandler.bind(this)}
          value={this.state.selectedChannel} />
        <div className={!this.state.isSearchingChannel && "hidden"}>
          {this.channelDoms()}
        </div>
      </div>
    );
  }

  channelDoms() {
    return this.state.channels.map((e, i)=> {
      return (
        <div key={i} onClick={this.onChannelClickHandler.bind(this)}>
          {e.name}
        </div>
      )
    })
  }

  onSearchBoxFocusHandler() {
    this.action.changeIsSearchingChannel(true);
  }
  onSearchBoxChangeHandler(e) {
    this.action.changeSelectedChannel(e.target.value);
  }

  onChannelClickHandler(e) {
    let channel = e.target.innerText;
    this.action.changeIsSearchingChannel(false);
    this.action.changeSelectedChannel(channel);
    this.refs.searchBox.blur();
  }
}

module.exports = ChannelList
