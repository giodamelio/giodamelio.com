import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import { Navbar } from '../../src/components';

it('renders brand', () => {
  const component = mount(<Navbar brand="Hello World!" />);
  expect(component.find('h1').text()).toBe('Hello World!');
});

it('renders links', () => {
  const component = mount(
    <MemoryRouter>
      <Navbar
        links={[
          {
            title: 'Home',
            url: '/',
          },
          {
            title: 'Blog',
            url: '/blog',
          },
        ]}
      />
    </MemoryRouter>
  );
  const listItems = component.find('li');
  expect(listItems.length).toBe(2);

  expect(listItems.at(0).text()).toBe('Home');
  expect(
    listItems
      .at(0)
      .find('Link')
      .prop('to')
  ).toBe('/');

  expect(listItems.at(1).text()).toBe('Blog');
  expect(
    listItems
      .at(1)
      .find('Link')
      .prop('to')
  ).toBe('/blog');
});

it('renders defaults', () => {
  const component = mount(<Navbar />);
  expect(component.find('h1').text()).toBe('');
  expect(component.find('li').length).toBe(0);
});
