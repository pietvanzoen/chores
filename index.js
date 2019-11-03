const { normalize } = require("path");

module.exports = (req, res) => {
  if (req.headers.host === "scripts.piet.me") {
    return redirect(
      res,
      `https://raw.githubusercontent.com/pietvanzoen/scripts/master/${req.url}`
    );
  }

  if (req.url === "/") {
    return redirect(res, "https://piet.me");
  }

  res.status(404).send("Not Found.");
};

function redirect(res, dest) {
  const redirect = normalize(dest);
  res.setHeader("Location", redirect);
  return res.status(302).send(`Redirecting to ${redirect}`);
}
