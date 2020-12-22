import React, { Component } from 'react';
import ErrorMessages from './partials/errorMessages'
import axios from 'axios';

class Register extends Component {
    state = {
        name:'',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }
    
        this.setState({
            name:'',
            email:'',
            password:''
        })
    
        axios({
            url: 'users/register',
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
                <h1 class="text-center mb-3">
                    <i class="fas fa-cannabis"></i> Registrace
                </h1>
                {/* <ErrorMessages/> */}
                <form onSubmit={this.submit} method="POST">
                    <div class="form-group">
                        <label for="name">Jméno</label>
                        <input type="name" id="name" name="name" onChange={this.handleInput} class="form-control" placeholder="Zadejte jméno" value={this.state.name}
                             />
                    </div>
    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" value={this.state.email} onChange={this.handleInput}  name="email" class="form-control" placeholder="Zadejte Email"
                            />
                    </div>
                    <div class="form-group">
                        <label for="password">Heslo</label>
                        <input type="password" id="password" name="password" class="form-control"
                            placeholder="Vytvořte heslo" value={this.state.password} onChange={this.handleInput} />
                    </div>
                    <button type="submit" class="btn btn-success btn-block">
                        Registrovat
                    </button>
                </form>
                <p class="lead mt-4">Máte již účet? <a href="/login">Přihlášení</a></p>
            </div>
        </div>
    </div>
        )
    }
}


export default Register