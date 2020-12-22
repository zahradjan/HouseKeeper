import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './views/users/login'
import Register from './views/users/register'
import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link,
      Redirect,
      useHistory,
      useLocation
    } from "react-router-dom";


ReactDOM.render(
      <Router>
            <Switch>
             <Route path='/login' component={Login} />  
             <Route path='/register' component={Register} />        
             <Route exact path='/' component={App} />    
            </Switch>
      </Router>



      , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
