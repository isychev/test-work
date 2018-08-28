import React from 'react';
import { mount } from 'enzyme';
import Welcome from '../Welcome';
import { getTestStore } from 'setupTests';

describe('test Welcome page', () => {
  it('should render null without login', () => {
    const { Component } = getTestStore({}, Welcome);
    const wrapper = mount(<Component />);
    expect(wrapper.html()).toEqual(null);
  });
  it('should render page with login', () => {
    const { Component } = getTestStore(
      {
        entities: {
          user: {
            login: 'ads',
          },
        },
      },
      Welcome,
    );
    const wrapper = mount(<Component />);
    expect(wrapper.find('h1').text()).toEqual('Welcome ads ');
  });
});
