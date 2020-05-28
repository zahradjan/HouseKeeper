import React from 'react';
import Budget from './budget/Budget';
import './App.css';
import Navbar from './navbar'

function App() {
  return (

    <div className="App">
      <Navbar />
      <div className="container my-5">
        <Budget />
      </div>
    </div>

  );
}

export default App;
