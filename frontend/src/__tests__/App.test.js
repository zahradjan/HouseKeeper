import React from 'react';
import { render as rtlRender , screen } from '@testing-library/react';
import App from '../App';

import axios from 'axios';

// import * as ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
  } from 'react-router-dom'

jest.mock('axios');

const render = (ui, {route = '/'} = {}) => {
    // window.history.pushState({}, 'Test page', route)
  
    return rtlRender(ui, {wrapper: Router})
  }
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it('renders without crashing', ()=>{
//     // const div = document.createElement('div')
//     // ReactDOM.render(<App/>,div)
//     render(<App/>)
   
//     expect(screen.getByText("Doma")).toBeInTheDocument();
// })



//3. test


// it('renders without crashing', ()=>{
//     const div = document.createElement('div')
//     ReactDOM.render(<App/>,div)
//     // render(<App/>)
//     ReactDOM.unmountComponentAtNode(div)
//     // expect(screen.getByText("Doma")).toBeInTheDocument();
// })

// 1. test 
// kdyz neni logged in tak ho to vrati na login page

test('proper navigation without logged in ', () => {
    render(<App/>, {route: '/'})   
    expect(screen.getByPlaceholderText("Zadejte heslo")).toBeInTheDocument();
})


// mocking axios for fetching users
test('should fetch users', () => {
  const users = [{name: 'Bob', email:'bob@sheslem', password:'sheslem'}]
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);
  return  axios.get('/users/').then(data => expect(data.data).toEqual(users));
});



