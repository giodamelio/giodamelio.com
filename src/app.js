import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import radium from 'radium';

import { Home, Test, Error404 } from './pages';
import { Navbar } from './components';

import './app.scss';

const styles = {
  display: 'flex',
  flexDirection: 'column',
};

function App() {
  return (
    <BrowserRouter>
      <div style={[styles]}>
        <Navbar
          brand="Gio d'Amelio"
          links={[
            {
              title: 'Home',
              url: '/',
            },
            {
              title: 'Test',
              url: '/test',
            },
          ]}
        />

        <Match exactly pattern="/" component={Home} />
        <Match pattern="/test" component={Test} />

        <Miss component={Error404} />
      </div>
    </BrowserRouter>
  );
}

export default radium(App);
