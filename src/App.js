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
      const info = extractInfoFromToken(bearer)
      const user = info.user
      setUsername(user.name)
    }
  }
  const callbackMessage = (msg) => {
    console.log('volam')
    setMessage(msg)
  }
  const extractInfoFromToken = (bearer) => {
    let tokenStringArray = bearer.split(" ")
    let decodedToken = jwt_decode(tokenStringArray[1])
    return decodedToken
  }

  

  const isLoggedIn = () => {
    let token = localStorage.getItem('jwt')
    if (token == null) return false
    const info = extractInfoFromToken(token)
    var date = Date.now()
    console.log("CALL")
    
    if(info.exp < date){
      callbackMessage('Prosím znovu se přihlašte!')
    
      localStorage.removeItem('jwt')  
      return false 
    }
    return true

  }



  const isLoggedInAsAdmin = () => {

    let token = localStorage.getItem('jwt')
    const info = extractInfoFromToken(token)
    const user = info.user
    if(user.role === "admin") return true
    return false

  }

  return (

    <div className="App">
      <div className="Wrapper">
     
        <Router>
          <Navbar userName={userName} callbackUsername={callbackUsername} callbackMessage={callbackMessage} />

          <Switch>

            <Route exact path='/login' render={(props) => {
              return (
                <Login  {...props} callbackUsername={callbackUsername} callbackMessage={callbackMessage} message={message} />
              )
            }} />
            <Route exact path='/register' render={(props) => {
              return (
                <Register  {...props} callbackMessage={callbackMessage} />
              )
            }} />
            <Route exact path='/' render={(props) => (
              isLoggedIn() ? (
                <Dashboard {...props} userName={userName} isLoggedInAsAdmin={isLoggedInAsAdmin}/>
              ) : (
                  <Redirect exact to="/login" />
                ))} />
          </Switch>


        </Router>
      </div>

      <Footer />
     
    </div>


  );
}

export default App;
