const React = require('react');

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <li className="message">
          <div className="icon">
            <img src={this.props.iconUrl} />
          </div>
          <div className="name">
            {this.props.name}
          </div>
          <div className="text">
            {this.props.content}
          </div>
      </li>
    );
  }
}

module.exports = Message
