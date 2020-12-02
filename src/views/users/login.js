import React, { Component } from 'react';
import ErrorMessages from './partials/errorMessages.ejs'


class Login extends Component {
    render() {
        <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i> Přihlášení</h1>
                <ErrorMessages/>
                <form action="/users/login" method="POST">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" class="form-control" placeholder="Zadejte Email" />
                    </div>
                    <div class="form-group">
                        <label for="password">Heslo</label>
                        <input type="password" id="password" name="password" class="form-control"
                            placeholder="Zadejte heslo" />
                    </div>
                    <button type="submit" class="btn btn-success btn-block">Login</button>
                </form>
                <p class="lead mt-4">
                   Nemáte ještě účet <a href="/users/register">Registrace</a>
                </p>
            </div>
        </div>
    </div>

    }
}


export default Login