import React from 'react';
import Budget from './budget/Budget';
import Notes from './notes/Notes'
import Users from './users/Users'
import '../App.css';





const Dashboard = (props) => {

    return (
      
  
         <div id="main">
          <div className="container my-5">
            <Budget userName={props.userName} isLoggedInAsAdmin={props.isLoggedInAsAdmin} />
          </div>
          {props.isLoggedInAsAdmin &&<div className="container my-5">
            <Users userName={props.userName} />
            </div>}
          <div className="container my-5">
            <Notes userName={props.userName} isLoggedInAsAdmin={props.isLoggedInAsAdmin} />
            </div>
        </div> 
      
   
      
    );
  }
  
  export default Dashboard;
  