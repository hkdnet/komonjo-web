const assert = require('power-assert');
const $ = require('jquery')

class KomonjoClient {
  constructor(opts) {
    if (typeof opts === 'string') {
      let tmp = opts;
      opts = { url: tmp };
    }
    this.url = this.normalizeUrl(opts.url);
  }

  channels() {
    return $.get({
      url: this.url + '/api/channels',
      dataType: 'JSON'
    })
  }

  messages(opts) {
    if (typeof opts === "string") {
      opts = { channelName: opts };
    }
    let channelName = opts.channelName;
    let count = opts.count || 100;
    return $.get({
      url: this.url + '/api/messages?channel_name=' + channelName + '&count=' + count,
      dataType: 'JSON'
    })
  }

  normalizeUrl(url) {
    return url.replace(/\/$/, '').replace(/\/api$/i, '')
  }
}

module.exports = KomonjoClient
