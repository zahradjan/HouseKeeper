import React from 'react';
import Budget from './budget/Budget';
import './App.css';
import Navbar from './partials/navbar'
import Footer from './partials/footer'

function App() {
  return (

    <div className="App">
      <Navbar />
      <div id="main">
      <div className="container my-5">
        <Budget />
      </div>
      </div>
      <Footer />
    </div>

  );
}

export default App;
