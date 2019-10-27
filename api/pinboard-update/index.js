const updateLinkDescription = require('./update-link-description.js');

module.exports.endpoint = (req, res) => {

  const url = JSON.parse(req.body).url;

  updateLinkDescription(url)
    .then(resp => {
      res.status(200).json({
        message: `Updated pin: ${url}`,
        resp
      });
    })
    .catch(err => {
      res.status(502).json({
        message: 'something went wrong parsing the url',
        error: err
      });
    });
};
