import React from 'react';
import Dashboard from './views/Dashboard'
import './App.css';
import Navbar from './views/partials/navbar'
import Footer from './views/partials/footer'
import Login from './views/users/login'
import Register from './views/users/register'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

const App = () => {
  const [userName, setUsername] = React.useState('');
  const callbackUsername = (email) => {
    // getUserName(email);
}
// React.useEffect(() => {
//   getUserName();
// }, [])
//   const getUserName = (email) => {
//     console.log("tady taky")
//     const payload = {
//       email:email
//     }
//     axios({
//       url: 'users/find',
//       method: 'POST',
//       data: payload
//   }).then((response) => {
//       console.log("tady taky2")
//         const username = response.data.name;
//         console.log(username)
//         setUsername(username);
//         this.props.history.push("/")

//   }).catch((err) => {
//         alert('ERROR RETRIEVING')
//     })
//   }
  return (
    
    <div className="App">
      <Router>
      <Navbar  userName={userName} />
      
            <Switch>
              {/* <Route path='/login' component={Login}/> */}
              <Route path='/login' > <Login callbackUsername={callbackUsername}/></Route> 
             {/* <Route path='/login'   render={() =>{
               return(
                <Login callbackUsername={callbackUsername()}/>
               )
             }}   />   */}
             <Route path='/register'> <Register /></Route> 
             {/* <Route path='/register' component={Register} />         */}
             <Route exact path='/'>
             <Dashboard/>
            </Route>    
            </Switch>
    
      <Footer />
      </Router>
    </div>
    
  );
}

export default App;
