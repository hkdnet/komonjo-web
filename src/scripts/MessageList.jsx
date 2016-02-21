const React = require('react');

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.action = this.props.action;
    this.state = {
      messages: this.store.getMessages(),
      selectedChannel: this.store.getSelectedChannel(),
      isWaitingMessage: this.store.getIsWaitingMessage()
    };
    this.store.on("CHANGE", ()=> {
      this.setState({
        messages: this.store.getMessages(),
        selectedChannel: this.store.getSelectedChannel(),
        isWaitingMessage: this.store.getIsWaitingMessage()
      });
    });
  }

  render() {
    return(
      <div>
        <div>
          {this.state.selectedChannel}
        </div>
        <div className={!this.state.isWaitingMessage && "hidden"}>
          <i className="fa fa-spinner fa-spin fa-3x" />
        </div>
        <div className={this.state.isWaitingMessage && "hidden"}>
          <ul>
            {this.messageDoms()}
          </ul>
        </div>
      </div>
    );
  }

  messageDoms() {
    return this.state.messages.map((e, i)=> {
      return (
        <li key={i}>
          {e.text}
        </li>
      )
    })
  }
}

module.exports = MessageList
