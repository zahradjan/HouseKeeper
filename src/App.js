import React from 'react';
import Dashboard from './views/Dashboard'
import './App.css';
import Navbar from './views/partials/navbar'
import Footer from './views/partials/footer'
import Login from './views/users/login'
import Register from './views/users/register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

const App = () => {
  const [userName, setUsername] = React.useState('');
  const callbackUsername = (user) => {
     setUsername(user.name)
     
}
  return (
    
    <div className="App">
      <Router>
      <Navbar  userName={userName} />
      
            <Switch>
            
             <Route path='/login'   render={(props) =>{
               return(
                <Login  {...props} callbackUsername={callbackUsername}/>
               )
             }}   />  
             <Route path='/register'   render={(props) =>{
               return(
                <Register  {...props} />
               )
             }}   /> 
             <Route exact path='/'   render={(props) =>{
               return(
                <Dashboard  {...props}  userName={userName} />
               )
             }}   />     
            </Switch>
    
      <Footer />
      </Router>
    </div>
    
  );
}

export default App;
