import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import radium from 'radium';

import { Home, Test, Error404 } from './pages';

const styles = {
  background: 'red',
};

function App() {
  return (
    <BrowserRouter>
      <div style={[styles]}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/test">Test</Link></li>
        </ul>

        <Match exactly pattern="/" component={Home} />
        <Match pattern="/test" component={Test} />

        <Miss component={Error404} />
      </div>
    </BrowserRouter>
  );
}

export default radium(App);
