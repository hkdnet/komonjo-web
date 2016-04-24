const React = require('react');
const EventEmitter = require("events").EventEmitter;

const ActionCreator = require("./ActionCreator.js");
const Store = require("./Store.js");
const Client = require('./KomonjoClient.js')

let dispatcher = new EventEmitter();
dispatcher.setMaxListeners(0);
let action = new ActionCreator(dispatcher);
let store = new Store(dispatcher);
store.setMaxListeners(0);
let client = new Client(store.getApiUrl());
client.channels().done((data)=>{
  action.changeChannels(data);
});
const Header = require('./Header.jsx');
const ChannelSearchBox = require('./ChannelSearchBox.jsx');
const MessageList = require('./MessageList.jsx');
const Footer = require('./Footer.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChannel: store.getSelectedChannel()
    }

  }

  render() {
    return(
      <div className='app'>
        <Header></Header>
        <div className="section">
          <ChannelSearchBox action={action} store={store} client={client}/>
          <MessageList action={action} store={store} />
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

module.exports = App
