const Pinboard = require('./pinboard');
const Metascraper = require('metascraper');
const pb = new Pinboard({token: process.env.AUTH_CODE});
const _ = require('lodash');

module.exports = function updateDescription(url) {
  return pb.getPost(url)
    .then(resp => {
      const post = resp.posts[0];
      if (!post) {
        return { message: 'no post matching ' + url };
      }
      if (post.extended && post.description) {
        return { message: 'Post already has required data' };
      }
      return Metascraper
        .scrapeUrl(url)
        .then((metadata) => {
          return pb.replacePost(_.merge({url}, post, {
            description: post.description || metadata.title,
            extended: post.extended || metadata.description
          }));
        });
    })
}
