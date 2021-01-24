import React from 'react';

import Dashboard from '../views/Dashboard';


import { shallow } from 'enzyme';



const isLoggedInAsAdmin = jest.fn();

describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Dashboard debug isLoggedInAsAdmin={isLoggedInAsAdmin}/>);
  
    expect(component).toMatchSnapshot();
  });
});