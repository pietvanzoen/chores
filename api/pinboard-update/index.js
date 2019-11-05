const updateLinkDescription = require("./update-link-description.js");
const logger = require("logger");

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

module.exports = logger((req, res) => {
  if (!req.body || !req.body.url) {
    res.status(400).json({ message: "url is required for parsing" });
    return;
  }

  const { url } = req.body;

  if (!validURL(url)) {
    res.status(400).json({ message: "invalid url", url });
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
        message: "something went wrong parsing the url",
        error: err.toString(),
        url
      });
    });
});
