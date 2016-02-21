const React = require('react');

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.action = this.props.action;
    this.state = {
      messages: this.store.getMessages(),
      selectedChannel: this.store.getSelectedChannel()
    };
    this.store.on("CHANGE", ()=> {
      this.setState({
        messages: this.store.getMessages(),
        selectedChannel: this.store.getSelectedChannel()
      });
    });
  }

  render() {
    return(
      <div>
        {this.state.selectedChannel}
        <ul>
          {this.messageDoms()}
        </ul>
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
