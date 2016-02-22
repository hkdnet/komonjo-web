const React = require('react');

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <li className="message">
          <div className="messageHeader">
            <img className="icon" src={this.props.iconUrl} />
            <span className="name">
              {this.props.name}
            </span>
          </div>
          <div className="messageContent">
            <div className="text">
              {this.props.content}
            </div>
          </div>
      </li>
    );
  }
}

module.exports = Message
