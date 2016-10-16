import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function RouterLink({ to, children, activeOnlyWhenExact }) {
  return (
    <Link to={to} activeOnlyWhenExact={activeOnlyWhenExact}>
      {({ isActive, onClick, href }) =>
        <li className={isActive ? 'active' : ''}>
          <a href={href} onClick={onClick}>
            {children}
          </a>
        </li>
      }
    </Link>
  );
}

RouterLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  activeOnlyWhenExact: PropTypes.bool,
};

export default RouterLink;