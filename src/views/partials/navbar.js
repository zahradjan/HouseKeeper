import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
    state = {
        userName:''
    }
    componentDidUpdate(prevProps) {
        if (prevProps.userName !== this.props.userName ) {
            this.setState({
                userName: this.props.userName,               
            })


        }

    }
    logout = (event) => {
        event.preventDefault();
        
    
        this.setState({
            userName:''
        })
        const storedToken = localStorage.getItem('jwt')
        if(storedToken != null)  localStorage.removeItem('jwt')   
        this.props.history.push("/login")
    
     
    };
    

    render() {
        return (
            <div className="navbar navbar-light bg-dark justify-content-between">
              
                <div className="container">
                    <img src="money-pig.png" alt="Money pig" width="35" height="40"></img>
                    <h2 className="text-white">Pomocník v domácnosti</h2>
                </div>
                <div className="container ">
                <a className="nav-link" href="/"><i className="fas fa-user-ninja fa-fw mr-1"></i>{this.state.userName}</a>



                <a className="nav-link" href="/"><i className="fa fa-home fa-fw mr-1"></i>Doma</a>


                <Link className="nav-link" onClick={this.logout}><i className="fas fa-sign-out-alt fa-fw mr-1"></i>Odhlásit</Link>

            

                </div>

               



            </div>
        )
    }
}

export default withRouter(Navbar)