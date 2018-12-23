import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

const NavbarLink = ({ children, ...props }) => (
  <Link className="navbar-item" {...props}>
    {children}
  </Link>
);

class Header extends Component {
  static propTypes = {
    siteTitle: PropTypes.string,
  };

  static defaultProps = {
    siteTitle: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      isBurgerMenuOpen: false,
    };

    this.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
  }

  toggleBurgerMenu() {
    this.setState(state => ({
      isBurgerMenuOpen: !state.isBurgerMenuOpen,
    }));
  }

  render() {
    const { siteTitle } = this.props;
    const { isBurgerMenuOpen } = this.state;

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavbarLink to="/">{siteTitle}</NavbarLink>

          {/* Disable because Bulma needs this element to be an 'a' tag */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            role="button"
            className={classnames('navbar-burger', 'burger', {
              'is-active': isBurgerMenuOpen,
            })}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMain"
            tabIndex={0}
            onClick={this.toggleBurgerMenu}
            onKeyPress={this.toggleBurgerMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="navbarMain"
          className={classnames('navbar-menu', {
            'is-active': isBurgerMenuOpen,
          })}
        >
          <div className="navbar-start">
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/blog">Blog</NavbarLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
