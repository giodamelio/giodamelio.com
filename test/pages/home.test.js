import React from 'react';
import { shallow } from 'enzyme';

import { Test } from '../../src/pages';

it('renders correct text', () => {
  const component = shallow(<Test />);
  expect(component.find('h1').text()).toBe('Test');
});
