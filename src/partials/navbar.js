import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (<div className="navbar navbar-light bg-dark">
            <div className="container">
                <img  src="calc-icon.png" alt="Calc-icon" width="35" height="40"></img>
                <h2 className="text-white">Kalkulátor výdajů v domácnosti</h2>
            </div>
        </div>
        )
    }
}

export default Navbar