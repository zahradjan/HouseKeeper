import React from 'react';
import Budget from './budget/Budget';
import Notes from './notes/Notes'
import '../App.css';





const Dashboard = () => {

    return (
      
  
         <div id="main">
          <div className="container my-5">
            <Budget />
          </div>
          <div className="container my-5">
            <Notes/>
            </div>
        </div> 
      
   
      
    );
  }
  
  export default Dashboard;
  