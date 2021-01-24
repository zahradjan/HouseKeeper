import React, { Component } from 'react';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Link } from 'react-router-dom';



class Login extends Component {
    state = {
        email: '',
        password: '',
        successfullMessage: '',
        errorMessage: '',
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        this.setState({ successfullMessage: this.props.message })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.successfullMessage !== this.props.successfullMessage) {

            this.setState({ successfullMessage: this.props.message })
        }
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = () => {
            return;
        };
    }

    submit = (event) => {
        event.preventDefault();

        const payload = {
            email: this.state.email,
            password: this.state.password,
        }


        axios({
            url: 'users/login',
            method: 'POST',
            data: payload
        })
            .then((response) => {


                localStorage.setItem('jwt', response.data.token)
                this.props.callbackUsername()
                this.props.history.push('/')
            })
            .catch((err) => {
                this.setState({ errorMessage: err.response.data.msg })
            })
    };


    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Přihlášení</h1>

                        {this.state.errorMessage &&
                            <Alert severity="error" onClose={() => { this.setState({ errorMessage: '' }) }}>
                                {this.state.errorMessage}
                            </Alert>
                        }
                        {this.state.successfullMessage &&
                            <Alert severity="success" onClose={() => { this.setState({ successfullMessage: '' }) }}>
                                {this.state.successfullMessage}
                            </Alert>
                        }
                        <form onSubmit={this.submit} method="POST">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" onChange={this.handleInput} value={this.state.email} name="email" autoComplete="email" className="form-control" placeholder="Zadejte email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Heslo</label>
                                <input value={this.state.password} onChange={this.handleInput} type="password" name="password" autoComplete="current-password" className="form-control"
                                    placeholder="Zadejte heslo" />
                            </div>
                            <button type="submit" className="btn btn-success btn-block">Login</button>
                        </form>
                        {/* <p class="lead mt-4">
                   Nemáte ještě účet <a href="/register">Registrace</a>
                </p> */}

                        <p className="lead mt-4"> Nemáte ještě účet <Link to="/register" onClick={this.props.callbackMessage('')}>Registrace</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login