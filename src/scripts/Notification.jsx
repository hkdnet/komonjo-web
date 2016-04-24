const React = require('react');

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.action = this.props.action;
    this.state = {
      showMessage: this.store.getIsShowNotification(),
      className: this.store.getNotificationClassName(),
      text: this.store.getNotificationText(),
    };
    this.store.on("CHANGE", ()=> {
      this.setState({
        showMessage: this.store.getIsShowNotification(),
        className: this.store.getNotificationClassName(),
        text: this.store.getNotificationText(),
      });
    })
  }

  render() {
    let className = this.state.showMessage ?
      "notification " + this.state.className :
      "is-hidden";
    return (
      <div className="column is-one-quarter is-offset-one-quarter">
        <div className={className}>
          <button
            className="delete"
            onClick={this.onHandleNotificationDeleteClick.bind(this)}>
          </button>
          {this.state.text}
        </div>
      </div>
    );
  }

  onHandleNotificationDeleteClick() {
    this.action.changeNotification({
      isShowNotification: false,
    });
  }
}

module.exports = Notification
