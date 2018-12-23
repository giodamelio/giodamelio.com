import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <h2>
      Some things will eventually be here. You should come back every day and
      check.
    </h2>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
