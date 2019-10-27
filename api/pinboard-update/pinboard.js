const request = require('request-promise-native');
const _ = require('lodash');

class Pinboard {
  constructor(options = {}) {
    this.token = options.token
  }

  getPost(url) {
    return request({
      method: 'GET',
      uri: 'https://api.pinboard.in/v1/posts/get',
      qs: {
        auth_token: this.token,
        format: 'json',
        url
      }
    })
    .then(JSON.parse);
  }

  replacePost(data) {
    return request({
      method: 'GET',
      uri: 'https://api.pinboard.in/v1/posts/add',
      json: true,
      qs: _.merge({
        auth_token: this.token,
        format: 'json',
        replace: 'yes'
      }, data)
    });
  }
}

module.exports = Pinboard;
