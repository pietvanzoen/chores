const router = require("./router");

module.exports = router({
  "scripts.piet.me": (req, res) =>
    res.redirect(
      302,
      `https://raw.githubusercontent.com/pietvanzoen/scripts/master/${req.url}`
    ),

  "img.piet.me": (req, res) =>
    res.redirect(301, `https://xn--vi8h.piet.me/${req.url}`),

  "www.pietvanzoen.com, pietvanzoen.com, www.piet.me": (req, res) =>
    res.redirect(301, `https://piet.me/${req.url}`),

  "chores.piet.me": (req, res) => {
    if (req.url === "/") return res.redirect(302, "https://piet.me");
  },

  default: (req, res) => res.status(404).send("Not found.")
});
