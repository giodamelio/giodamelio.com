import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/app';

it('renders without crashing', () => {
  shallow(<App />);
});

it('contains correct text', () => {
  const app = shallow(<App />);
  expect(app.find('h1').text()).toBe('Hello World!');
});
