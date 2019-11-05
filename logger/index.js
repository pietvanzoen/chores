const morganLogger = require("morgan")(
  '[:req[host]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'
);

module.exports = function logger(handler) {
  return (req, res) => {
    morganLogger(req, res, () => {});
    return handler(req, res);
  };
};
