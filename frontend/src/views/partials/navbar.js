import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
    state = {
        userName: ''
    }
    componentDidMount() {
      
        if(this.props.userName !== this.state.userName) this.setState({userName: this.props.userName})
        // console.log(this.state.userName)
        this.props.callbackUsername()
    }

    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }

    logout = (event) => {
        event.preventDefault();


        this.setState({
            userName: ''
        })
        if (localStorage.getItem('jwt') !== null) localStorage.removeItem('jwt')
        this.props.callbackMessage("Uživatel úspěšně odhlášen!")
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


                    <Link to="/login" className="nav-link" onClick={this.logout}><i className="fas fa-sign-out-alt fa-fw mr-1"></i>Odhlásit</Link>



                </div>





            </div>
        )
    }
}

export default withRouter(Navbar)