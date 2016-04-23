const React = require('react');

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <li className="box message">
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
        </article>
      </li>
    );
  }
}
module.exports = Message
