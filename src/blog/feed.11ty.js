const { Feed } = require('feed');
// const feed = require('./feed.js');

const feed = new Feed({
  title: 'Gio\'s Blog',
  description: 'Here are my blog posts on random (though mostly technological) topics.',
  id: 'https://giodamelio.com/blog/',
  link: 'https://giodamelio.com/blog/',
  // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  language: 'en',
  feedLinks: {
    json: 'https://giodamelio.com/blog/feed.json',
    atom: 'https://giodamelio.com/blog/feed.atom',
    rss: 'https://giodamelio.com/blog/feed.rss',
  },
  author: {
    name: 'Gio d\'Amelio',
    email: 'giodamelio@gmail.com',
    link: 'https://giodamelio.com'
  }
});

function buildFeed(data) {
  data.collections.posts.forEach(post => {
    feed.addItem({
      title: post.data.title,
      id: post.url,
      link: this.url(post.url),
      date: post.data.date,
      content: post.templateContent,
      author: [
        {
          name: 'Gio d\'Amelio',
          email: 'giodamelio@gmail.com',
          link: 'https://giodamelio.com',
        }
      ]
    });
  });

  return feed;
}

module.exports = class {
  data() {
    return {
      pagination: {
        data: 'formats',
        size: 1,
      },
      formats: [
        { extension: 'json', func: 'json1' },
        { extension: 'atom', func: 'atom1' },
        { extension: 'rss', func: 'rss2' }
      ],
      permalink: (data) =>
        `/blog/feed.${data.pagination.items[0].extension}`,
    };
  }

  render(data) {
    const feed = buildFeed.apply(this, [data]);
    const func = data.pagination.items[0].func;
    return feed[func]();
  }
}