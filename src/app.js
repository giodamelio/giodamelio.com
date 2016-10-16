import React from 'react';
import { BrowserRouter, Link, Match, Miss } from 'react-router';
import radium from 'radium';
import { Navbar, Nav } from 'react-bootstrap';

import { Home, Blog, Error404 } from './pages';
import { RouterLink } from './components';

import './app.scss';

const styles = {
  display: 'flex',
  flexDirection: 'column',
};

function App() {
  return (
    <BrowserRouter>
      <div style={[styles]}>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                Gio d'Amelio
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <RouterLink to="/" activeOnlyWhenExact>Home</RouterLink>
            <RouterLink to="/blog">Blog</RouterLink>
          </Nav>
        </Navbar>

        <Match exactly pattern="/" component={Home} />
        <Match pattern="/blog" component={Blog} />

        <Miss component={Error404} />
      </div>
    </BrowserRouter>
  );
}

export default radium(App);
