const { normalize } = require("path");

module.exports = function router(config) {
  const parsedConfig = {};

  for (const key in config) {
    key.split(",").forEach(host => {
      parsedConfig[host.trim()] = config[key];
    });
  }

  if (!parsedConfig.default) {
    throw new TypeError("Missing default handler");
  }

  return (req, res) => {
    const defaultHandler = parsedConfig.default;
    const handler = parsedConfig[req.headers.host] || defaultHandler;

    if (res.redirect) {
      throw new Error("huh... seems like a redirect method got added");
    }

    res.redirect = (code, url) => {
      const normalizedUrl = normalize(url);
      res.setHeader("Location", normalizedUrl);
      return res.status(code).send(`Redirecting to ${normalizedUrl}`);
    };

    if (!handler(req, res)) {
      defaultHandler(req, res);
    }
  };
};
