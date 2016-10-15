import React from 'react';
import { shallow } from 'enzyme';

import { Home } from '../../src/pages';

it('renders correct text', () => {
  const component = shallow(<Home />);
  expect(component.find('h1').text()).toBe('Home');
});
