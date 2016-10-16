import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import { RouterLink } from '../../src/components';

it('renders link', () => {
  const component = mount(
    <MemoryRouter location="/">
      <RouterLink to="/">Home</RouterLink>
    </MemoryRouter>
  );
  expect(component.find('a').text()).toBe('Home');
  expect(component.find('a').prop('href')).toBe('/');
});

it('renders active element', () => {
  const component = mount(
    <MemoryRouter location="/test">
      <RouterLink to="/test">Test</RouterLink>
    </MemoryRouter>
  );
  expect(component.find('a').text()).toBe('Test');
  expect(component.find('a').prop('href')).toBe('/test');
  expect(component.find('li').hasClass('active')).toBe(true);
});

it('renders active element with exact match', () => {
  const component = mount(
    <MemoryRouter location="/test2">
      <RouterLink to="/test" activeOnlyWhenExact>Test</RouterLink>
    </MemoryRouter>
  );
  expect(component.find('a').text()).toBe('Test');
  expect(component.find('a').prop('href')).toBe('/test');
  expect(component.find('li').hasClass('active')).toBe(false);
});
