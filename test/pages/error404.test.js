import React from 'react';
import { shallow } from 'enzyme';

import { Error404 } from '../../src/pages';

it('renders correct text', () => {
  const component = shallow(<Error404 />);
  expect(component.find('h1').text()).toBe('Error: 404');
});
