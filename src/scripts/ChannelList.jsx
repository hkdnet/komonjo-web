const React = require('react');

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.action = this.props.action;
    this.state = {
      channels: this.store.getChannels(),
      channelSearchKeyword: this.store.getChannelSearchKeyword(),
      selectedChannel: this.store.getSelectedChannel(),
      isSearchingChannel: this.store.getIsSearchingChannel()
    };
    this.store.on("CHANGE", ()=> {
      this.setState({
        channels: this.store.getChannels(),
        channelSearchKeyword: this.store.getChannelSearchKeyword(),
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
          onBlur={this.onSearchBoxBlurHandler.bind(this)}
          onChange={this.onSearchBoxChangeHandler.bind(this)}
          onKeyDown={this.onSearchBoxKeyDownHandler.bind(this)}
          value={this.state.channelSearchKeyword} />
        <div className={!this.state.isSearchingChannel && "hidden"}>
          {this.channelDoms()}
        </div>
      </div>
    );
  }

  channelDoms() {
    return this.state.channels.map((e, i)=> {
      return (
        <div key={i} className="searchResult"
             onClick={this.onChannelClickHandler.bind(this)}>
          {e.name}
        </div>
      )
    })
  }

  onSearchBoxFocusHandler() {
    this.action.changeChannelSearchKeyword('');
    this.action.changeIsSearchingChannel(true);
  }
  onSearchBoxBlurHandler() {
    setTimeout(()=>{
      this.action.changeIsSearchingChannel(false);
    }, 300);
  }
  onSearchBoxChangeHandler(e) {
    this.action.changeChannelSearchKeyword(e.target.value);
  }
  onSearchBoxKeyDownHandler(e) {
    // Enter
    if(e.keyCode == 13 && this.state.channels.length == 1) {
      let channel = this.state.channels[0].name;
      this.action.changeIsSearchingChannel(false);
      this.action.changeSelectedChannel(channel);
      this.action.changeChannelSearchKeyword(channel);
      this.refs.searchBox.blur();
    }
  }

  onChannelClickHandler(e) {
    let channel = e.target.innerText;
    this.action.changeIsSearchingChannel(false);
    this.action.changeSelectedChannel(channel);
    this.action.changeChannelSearchKeyword(channel);
    this.refs.searchBox.blur();
  }
}

module.exports = ChannelList
