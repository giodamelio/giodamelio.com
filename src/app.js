import React from 'react';
import { BrowserRouter, Link, Match, Miss } from 'react-router';
import radium from 'radium';
import { Navbar, Nav } from 'react-bootstrap';

import { Home, Test, Error404 } from './pages';

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
              <a href="/">Gio d'Amelio</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </Nav>
        </Navbar>

        <Match exactly pattern="/" component={Home} />
        <Match pattern="/test" component={Test} />

        <Miss component={Error404} />
      </div>
    </BrowserRouter>
  );
}

export default radium(App);
