const React = require('react');

class ChannelSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.action = this.props.action;
    this.state = {
      channels: this.store.getChannels(),
      channelSearchKeyword: this.store.getChannelSearchKeyword(),
      selectedChannel: this.store.getSelectedChannel(),
      isSearchingChannel: this.store.getIsSearchingChannel(),
      channelSearchSelectedIndex: this.store.getChannelSearchSelectedIndex()
    };
    this.store.on("CHANGE", ()=> {
      this.setState({
        channels: this.store.getChannels(),
        channelSearchKeyword: this.store.getChannelSearchKeyword(),
        selectedChannel: this.store.getSelectedChannel(),
        isSearchingChannel: this.store.getIsSearchingChannel(),
        channelSearchSelectedIndex: this.store.getChannelSearchSelectedIndex()
      });
    })
  }

  render() {
    return(
      <div className="column is-half">
        <label className="label">channel</label>
        <div className="control has-icon">
          <input ref="searchBox" className="input" placeholder="channel name..."
            onFocus={this.onSearchBoxFocusHandler.bind(this)}
            onBlur={this.onSearchBoxBlurHandler.bind(this)}
            onChange={this.onSearchBoxChangeHandler.bind(this)}
            onKeyDown={this.onSearchBoxKeyDownHandler.bind(this)}
            value={this.state.channelSearchKeyword} />
          <i className="fa fa-slack"></i>
        </div>
        <div className="control">
          <nav className={this.state.isSearchingChannel ? "panel" : "is-hidden"}>
            {this.channelDoms()}
          </nav>
        </div>
      </div>
    );
  }

  channelDoms() {
    return this.state.channels.map((e, i)=> {
      let className = "panel-block ";
      let isSelected = i == this.store.channelSearchSelectedIndex;
      if(i == this.store.channelSearchSelectedIndex) {
        className += " is-active";
      }
      return (
        <a
          href="#"
          tabIndex="-1"
          key={i}
          data-idx={i}
          className={className}
          onClick={this.onChannelClickHandler.bind(this)}
          onMouseOver={this.onChannelMouseOverHandler.bind(this)}>
          <span className="panel-icon">
            <i className="fa fa-slack"></i>
          </span>
          {e.name}
        </a>
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
    let idx;
    switch(e.keyCode) {
      case 13: // Enter
        idx = this.state.channelSearchSelectedIndex;
        let channel = this.state.channels[idx].name;
        this.action.changeIsSearchingChannel(false);
        this.action.changeSelectedChannel(channel);
        this.action.changeChannelSearchKeyword(channel);
        break;
      case 38: // UP
        idx = this.state.channelSearchSelectedIndex - 1;
        if (idx < 0) {
          idx = 0;
        }
        this.action.changeChannelSearchSelectedIndex(idx)
        this.action.changeIsSearchingChannel(true);
        break;
      case 40: // DOWN
        idx = this.state.channelSearchSelectedIndex + 1;
        if (idx > this.state.channels.length - 1) {
          idx = this.state.channels.length - 1;
        }
        this.action.changeChannelSearchSelectedIndex(idx)
        this.action.changeIsSearchingChannel(true);
        break;
    }
  }

  onChannelClickHandler(e) {
    let channel = e.target.innerText;
    this.action.changeIsSearchingChannel(false);
    this.action.changeSelectedChannel(channel);
    this.action.changeChannelSearchKeyword(channel);
  }
  onChannelMouseOverHandler(e) {
    let idx = e.target.getAttribute('data-idx') - 0;
    this.action.changeChannelSearchSelectedIndex(idx)
  }
}

module.exports = ChannelSearchBox
