const { Feed } = require('feed');

function buildFeed(data, _extension) {
  const feed = new Feed({
    title: 'Gio\'s Blog',
    description: 'Here are my blog posts on random (though mostly technological) topics.',
    id: `${data.baseUrl}/blog/`,
    link: `${data.baseUrl}/blog/`,
    // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    language: 'en',
    feedLinks: {
      json: `${data.baseUrl}/blog/feed.json`,
      atom: `${data.baseUrl}/blog/feed.atom`,
      rss: `${data.baseUrl}/blog/feed.rss`,
    },
    author: {
      name: 'Gio d\'Amelio',
      email: 'giodamelio@gmail.com',
      link: 'https://giodamelio.com'
    }
  });

  data.collections.posts.forEach(post => {
    feed.addItem({
      title: post.data.title,
      id: `${data.baseUrl}/blog${this.url(post.url)}`,
      link: `${data.baseUrl}/blog${this.url(post.url)}`,
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
    const { extension, func } = data.pagination.items[0];
    const feed = buildFeed.apply(this, [data, extension]);
    return feed[func]();
  }
}