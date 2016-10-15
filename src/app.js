import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

function Home() {
  return <h1>Home</h1>;
}

function Test() {
  return <h1>Test</h1>;
}

function Error404() {
  return <h1>Error: 404</h1>;
}

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
