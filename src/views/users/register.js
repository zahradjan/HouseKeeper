import React, { Component } from 'react';
import ErrorMessages from './partials/errorMessages'
import { Link, Redirect, useHistory } from 'react-router-dom';
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
      
    //    const history = useHistory();
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
      
                // this.props.history.push('/login')
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
                <h1 className="text-center mb-3">
                    <i className="fas fa-user-plus"></i> Registrace
                </h1>
                {/* <ErrorMessages/> */}
                <form onSubmit={this.submit} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Jméno</label>
                        <input type="name" name="name" onChange={this.handleInput} className="form-control" placeholder="Zadejte jméno" value={this.state.name}
                             />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={this.state.email} onChange={this.handleInput}  name="email" className="form-control" placeholder="Zadejte email"
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo</label>
                        <input type="password" id="password" name="password" className="form-control"
                            placeholder="Vytvořte heslo" value={this.state.password} onChange={this.handleInput} />
                    </div>
                    <button type="submit" className="btn btn-success btn-block">
                        Registrovat
                    </button>
                </form>
                {/* <p class="lead mt-4">Máte již účet? <a href="/login">Přihlášení</a></p> */}
                <p className="lead mt-4">Máte již účet? <Link to="/login"> Přihlášení</Link></p>
            </div>
        </div>
    </div>
        )
    }
}


export default Register