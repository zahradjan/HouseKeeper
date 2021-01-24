import Login from '../views/users/login';
import { render as rtlRender , screen } from '@testing-library/react';
import axios from 'axios';
import {
  BrowserRouter as Router,
} from 'react-router-dom'



const callbackMessage = jest.fn();

const render = (ui, {route = '/'} = {}) => {
  // window.history.pushState({}, 'Test page', route)

  return rtlRender(ui, {wrapper: Router})
}


// 2. test 
// kdyz se logne tak se dostane na dashboard

test('proper navigation with login info', async()=>{
    render(<Login callbackMessage={callbackMessage}/>, {route:'/login'})
    const payload = {email:'admin@admin00', heslo:'admin00'}
    return axios.post('/users/login',{data:payload}).then((response) => expect(response.data).not.toBeNull());

  })
  