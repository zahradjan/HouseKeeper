import React from 'react';
import Budget from './views/budget/Budget';
import Notes from './views/notes/Notes'
import './App.css';
import Navbar from './views/partials/navbar'
import Footer from './views/partials/footer'


function App() {

  return (
    
    <div className="App">
      <Navbar />
      
      <div id="main">
        <div className="container my-5">
          <Budget />
        </div>
        <div className="container my-5">
          <Notes/>
          </div>
      </div>
    
      <Footer />
    </div>
    
  );
}

export default App;
