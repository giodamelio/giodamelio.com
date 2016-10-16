import React from 'react';
import { shallow } from 'enzyme';

import { Blog } from '../../src/pages';

it('renders correct text', () => {
  const component = shallow(<Blog />);
  expect(component.find('h1').text()).toBe('Blog');
});
