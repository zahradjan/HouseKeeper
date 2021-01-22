import React, { Component } from 'react';
// import ErrorMessages from './partials/errorMessages'
import { Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import { Alert} from '@material-ui/lab';

class Register extends Component {
    

    state = {
        name:'',
        email:'',
        password:'',
        errorMessage:'',
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit = (event) => {
      
        event.preventDefault();
        if(!this.state.name || !this.state.email || !this.state.password) return
        if(this.state.password.length < 6) return
        const payload = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }
    
       
    
        axios({
            url: 'users/register',
            method: 'POST',
            data: payload
        })
            .then(() => {
                this.props.callbackMessage("Uživatel úspěšně zaregistrován!")
                this.props.history.push('/login')
            })
            .catch((err) => {
                this.setState({ errorMessage: err.response.data.msg})
                
               
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
                {this.state.errorMessage &&
                        <Alert severity="error" onClose={() => {this.setState({errorMessage:''})}}>
                      
                        {this.state.errorMessage} 
                        </Alert>
                         } 
                  {(!this.state.name || !this.state.email || !this.state.password) &&
                        <Alert severity="warning" >
                     
                       Prosím vyplňte všechny údaje!
                        </Alert>
                         }          
                 {this.state.password && this.state.password.length < 6 &&
                        <Alert severity="warning" >
                     
                        Heslo je příliš krátké! Musí obsahovat alespoň 6 znaků!
                        </Alert>
                         }          

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
                <p className="lead mt-4">Máte již účet? <Link to="/login"  > Přihlášení</Link></p>
            </div>
        </div>
    </div>
        )
    }
}


export default withRouter(Register)