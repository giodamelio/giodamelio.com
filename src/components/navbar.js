import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Navbar({ brand = '', links = [] }) {
  return (
    <nav>
      <h1>{brand}</h1>
      <ul>
        {links.map((link, index) =>
          <li key={index}>
            <Link to={link.url}>{link.title}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  brand: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

export default Navbar;
