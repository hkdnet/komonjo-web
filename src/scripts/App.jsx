const React = require('react');
const EventEmitter = require("events").EventEmitter;

const ActionCreator = require("./ActionCreator.js");
const Store = require("./Store.js");
const Client = require('./KomonjoClient.js')

let dispatcher = new EventEmitter();
let action = new ActionCreator(dispatcher);
let store = new Store(dispatcher);
let client = new Client("http://192.168.99.100");
client.channels().done((data)=>{
  action.changeChannels(data);
});
const ChannelList = require('./ChannelList.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChannel: store.getSelectedChannel()
    }
    store.on("CHANGE", ()=> {
      this.setState({
        selectedChannel: store.getSelectedChannel()
      });
    });
  }

  render() {
    return(
      <div className='app'>
        <ChannelList action={action} store={store} client={client}/>
        <div>{this.state.selectedChannel}</div>
      </div>
    );
  }
}

module.exports = App
