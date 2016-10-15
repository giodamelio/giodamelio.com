import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

import { Home, Test, Error404 } from './pages';

function App() {
  return (
    <BrowserRouter>
      <div>
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

export default App;
