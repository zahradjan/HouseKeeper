import React, { Component } from 'react';
import ErrorMessages from './partials/errorMessages'
import axios from 'axios';


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
    getUsers(){
        axios.get('/users')
        .then((response) => {
            const data = response.data;
            this.setState({ data: data })
        })
        .catch((err) => {
            alert('ERROR RETRIEVING')
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
        .then(() => {
            this.props.callbackExpenses();
        })
        .catch(() => {
            console.log('ERROR');
        })
};


    render() {
        return(
        <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i> Přihlášení</h1>
                {/* <ErrorMessages/> */}
                <form onSubmit={this.submit} method="POST">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" onChange={this.handleInput}  value={this.state.email} name="email" class="form-control" placeholder="Zadejte Email" />
                    </div>
                    <div class="form-group">
                        <label for="password">Heslo</label>
                        <input  value={this.state.password}  onChange={this.handleInput} type="password" name="password" class="form-control"
                            placeholder="Zadejte heslo" />
                    </div>
                    <button type="submit" class="btn btn-success btn-block">Login</button>
                </form>
                <p class="lead mt-4">
                   Nemáte ještě účet <a href="/register">Registrace</a>
                </p>
            </div>
        </div>
    </div>
        )
    }
}


export default Login