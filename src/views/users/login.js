import React, { Component } from 'react';
import ErrorMessages from './partials/errorMessages'
import axios from 'axios';
import { Link } from 'react-router-dom';


class Login extends Component {
    state = {      
        email:'',
        password:''
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

submit = (event) => {
    event.preventDefault();

    const payload = {
        email: this.state.email,
        password: this.state.password,
    }

    this.setState({
        email:'',
        password:''
    })

    axios({
        url: 'users/login',
        method: 'POST',
        data: payload
    })
        .then((response) => {
            console.log("email:" + response.data.email)
            console.log("email:" + response.data.name)
            this.props.callbackUsername(response)          
        })
        .catch(() => {
            console.log('ERROR');
        })
};


    render() {
        return(
        <div className="row mt-5">
        <div className="col-md-6 m-auto">
            <div className="card card-body">
                <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Přihlášení</h1>
                {/* <ErrorMessages/> */}
                <form onSubmit={this.submit} method="POST">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={this.handleInput}  value={this.state.email} name="email" className="form-control" placeholder="Zadejte email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo</label>
                        <input  value={this.state.password}  onChange={this.handleInput} type="password" name="password" className="form-control"
                            placeholder="Zadejte heslo" />
                    </div>
                    <button type="submit" className="btn btn-success btn-block">Login</button>
                </form>
                {/* <p class="lead mt-4">
                   Nemáte ještě účet <a href="/register">Registrace</a>
                </p> */}

                <p className="lead mt-4"> Nemáte ještě účet <Link to="/register">Registrace</Link></p>
            </div>
        </div>
    </div>
        )
    }
}


export default Login