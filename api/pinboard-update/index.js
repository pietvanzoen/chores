const updateLinkDescription = require('./update-link-description.js');

module.exports.endpoint = (event, context, callback) => {

  const url = JSON.parse(event.body).url;

  updateLinkDescription(url)
    .then(resp => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: 'update completed',
          response: resp
        })
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 502,
        body: JSON.stringify(err)
      })
    });
};
