import React from 'react';
import Dashboard from './views/Dashboard'
import './App.css';
import Navbar from './views/partials/navbar'
import Footer from './views/partials/footer'
import Login from './views/users/login'
import Register from './views/users/register'
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  const [userName, setUsername] = React.useState('');
  const [message, setMessage] = React.useState('');

  const callbackUsername = () => {
    const bearer = localStorage.getItem("jwt")
    if (bearer !== null) {
      const user = extractUserFromToken(bearer)
      setUsername(user.name)
    }
  }
  const callbackMessage = (msg) => {
    setMessage(msg)
  }
  const extractUserFromToken = (bearer) => {
    let tokenStringArray = bearer.split(" ")
    let decodedToken = jwt_decode(tokenStringArray[1])
    return decodedToken.user
  }
  const isLoggedIn = () => {
    let authenticated = localStorage.getItem('jwt')
    if (authenticated != null) return true

    return false

  }

  return (

    <div className="App">
      <div className="Wrapper">
        <Router>
          <Navbar userName={userName} callbackUsername={callbackUsername} callbackMessage={callbackMessage} />

          <Switch>

            <Route path='/login' render={(props) => {
              return (
                <Login  {...props} callbackUsername={callbackUsername} message={message} />
              )
            }} />
            <Route path='/register' render={(props) => {
              return (
                <Register  {...props} callbackMessage={callbackMessage} />
              )
            }} />
            <Route exact path='/' render={(props) => (
              isLoggedIn() ? (
                <Dashboard {...props} userName={userName} />
              ) : (
                  <Redirect to="/login" />
                ))} />
          </Switch>


        </Router>
      </div>

      <Footer />
     
    </div>


  );
}

export default App;
