import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import App from '../App';

import axios from 'axios';

// import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

jest.mock('axios');

const render = (ui, { route = '/' } = {}) => {
  return rtlRender(ui, { wrapper: Router })
}
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('renders without crashing', () => {
  // const div = document.createElement('div')
  // ReactDOM.render(<App/>,div)
  render(<App />)

  expect(screen.getByText("Doma")).toBeInTheDocument();
})

// kdyz neni logged in tak ho to vrati na login page

test('proper navigation without logged in ', () => {
  //arrange
  //action
  render(<App />, { route: '/' })
  //assertion
  expect(screen.getByPlaceholderText("Zadejte heslo")).toBeInTheDocument();
})


// mocking axios for fetching users
test('should fetch users', async () => {
  //arrange
  const users = [{ name: 'Bob', email: 'bob@sheslem', password: 'sheslem' }]
  const resp = { data: users };
  //action
  axios.get.mockResolvedValue(resp);
  const response = await axios.get('/users/')
  //assertion
  expect(response.data).toEqual(users)
});



