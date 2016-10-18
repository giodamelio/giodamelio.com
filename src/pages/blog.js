import React from 'react';

// eslint-disable-next-line
const testPost = require('../../content/blog/test-post.md');

function Blog() {
  return (
    <div dangerouslySetInnerHTML={{ __html: testPost.content }} />
  );
}

export default Blog;
