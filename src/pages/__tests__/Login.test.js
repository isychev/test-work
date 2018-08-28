import React from 'react';
import { mount } from 'enzyme';
import { LoginBase } from '../Login';

describe('test Login page', () => {
  it('should render page', () => {
    const wrapper = mount(<LoginBase />);
    expect(wrapper.find('form').length).toEqual(1);
  });
});
