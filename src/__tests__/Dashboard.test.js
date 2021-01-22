import React from 'react';

import Dashboard from '../views/Dashboard';


import { shallow } from 'enzyme';




describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Dashboard debug />);
  
    expect(component).toMatchSnapshot();
  });
});