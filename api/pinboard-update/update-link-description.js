const Pinboard = require('./pinboard');
const Metascraper = require('metascraper');
const pb = new Pinboard({token: process.env.PINBOARD_TOKEN});
const _ = require('lodash');

module.exports = function updateDescription(url) {
  return pb.getPost(url)
    .then(resp => {
      const post = resp.posts[0];
      if (!post) {
        return 'no post matching ' + url;
      }
      return Metascraper
        .scrapeUrl(url)
        .then((metadata) => {
          return pb.replacePost(_.merge({url}, post, {
            description: metadata.title,
            extended: post.extended || metadata.description
          }));
        });
    })
}
