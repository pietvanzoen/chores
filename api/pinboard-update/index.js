const updateLinkDescription = require('./update-link-description.js');

module.exports = (req, res) => {

  try {
    const url = JSON.parse(req.body).url;
  } catch (error) {
    res.status(400).json({ message: 'could not parse payload', errorMessage: error.toString(), body: res.body });
    return;
  }

  if (!url) {
    res.status(400).json({ message: 'url is required for parsing' });
    return;
  }

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
