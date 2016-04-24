const React = require('react');

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.action = this.props.action;
    this.state = {
      isSelected: false
    };
    this.store.on("CHANGE", ()=> {
      this.setState({
        isSelected: this.store.getIsSelected(this.props.messageId)
      });
    })
  }

  render() {
    return(
      <li
        className="box message"
        onClick={this.onMessageClickHandler.bind(this)}
        >
        <article className="media">
          <div className="media-left">
            <div className="image is-48x48">
              <img src={this.props.iconUrl} />
            </div>
          </div>
          <div className="media-content">
            <div className="messageHeader">
              <span className="name">
                {this.props.name}
              </span>
            </div>
            <div className="messageContent">
              <div className="text">
                {this.props.content}
              </div>
            </div>
          </div>
          <div className="media-right">
            <div className="image is-24x24">
              <i className={this.state.isSelected && "fa fa-check button is-success"}></i>
            </div>
          </div>
        </article>
      </li>
    );
  }

  onMessageClickHandler() {
    this.action.changeIsSelected({
      key: this.props.messageId
    });
  }
}
module.exports = Message
