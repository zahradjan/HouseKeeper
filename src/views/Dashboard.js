import React from 'react';
import Budget from './budget/Budget';
import Notes from './notes/Notes'
import '../App.css';





const Dashboard = (props) => {

    return (
      
  
         <div id="main">
          <div className="container my-5">
            <Budget />
          </div>
          <div className="container my-5">
            <Notes userName={props.userName} />
            </div>
        </div> 
      
   
      
    );
  }
  
  export default Dashboard;
  