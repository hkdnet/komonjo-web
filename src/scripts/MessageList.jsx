const React = require('react');
const Message = require('./Message.jsx')

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
        <div className="title">
          {this.state.selectedChannel && "#" + this.state.selectedChannel}
        </div>
        <div className={!this.state.isWaitingMessage && "is-hidden"}>
          <i className="fa fa-spinner fa-spin fa-3x" />
        </div>
        <div className={this.state.isWaitingMessage && "is-hidden"}>
          <ul className="messages">
            {this.messageDoms()}
          </ul>
        </div>
      </div>
    );
  }

  messageDoms() {
    return this.state.messages.map((e, i)=> {
      return (
        <Message key={i}
                 messageId={i}
                 iconUrl={e.user.profile.image_48}
                 name={e.user.name}
                 content={e.text}
                 action={this.props.action}
                 store={this.props.store}
                 />
      )
    })
  }
}

module.exports = MessageList
