import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/app';

it('renders without crashing', () => {
  shallow(<App />);
});
