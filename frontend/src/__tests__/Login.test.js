import Login from '../views/users/login';
import { render as rtlRender , screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import axios from 'axios';
import {
  BrowserRouter as Router,
} from 'react-router-dom'



const callbackMessage = jest.fn();

const render = (ui, {route = '/'} = {}) => {
  // window.history.pushState({}, 'Test page', route)

  return rtlRender(ui, {wrapper: Router})
}


  test('Login without credentials',()=>{
    //arrange
    render(<Login callbackMessage={callbackMessage}/>, {route:'/login'})
    //action
    userEvent.click(screen.getByText('Přihlásit se'))
    //assert
    expect(screen.getByText('Prosím vyplňte všechny údaje!')).toBeInTheDocument()
  })
  