import React, { Component } from 'react';
import ErrorMessages from './partials/errorMessages.ejs'


class Register extends Component {
    render() {
        <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3">
                    <i class="fas fa-cannabis"></i> Registrace
                </h1>
                <ErrorMessages/>
                <form action="/users/register" method="POST">
                    <div class="form-group">
                        <label for="name">Jméno</label>
                        <input type="name" id="name" name="name" class="form-control" placeholder="Zadejte jméno"
                            value="<%= typeof name != 'undefined' ? name : '' %>" />
                    </div>
    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" class="form-control" placeholder="Zadejte Email"
                            value="<%= typeof email != 'undefined' ? email : '' %>" />
                    </div>
                    <div class="form-group">
                        <label for="password">Heslo</label>
                        <input type="password" id="password" name="password" class="form-control"
                            placeholder="Vytvořte heslo" value="<%= typeof password != 'undefined' ? password : '' %>" />
                    </div>
                    <button type="submit" class="btn btn-success btn-block">
                        Registrovat
                    </button>
                </form>
                <p class="lead mt-4">Máte již účet? <a href="/users/login">Přihlášení</a></p>
            </div>
        </div>
    </div>

    }
}


export default Register