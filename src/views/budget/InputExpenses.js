import React, { Component } from 'react';
import axios from 'axios';


class InputExpenses extends Component {

    state = {
        expenses: [],
        expenseTitle: '',
        amount: 0,
        userName:'',
        id: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    

    componentDidUpdate(prevProps) {
        if (prevProps.expenseItem.expenseTitle !== this.props.expenseItem.expenseTitle ) {
            this.setState({
                expenseTitle: this.props.expenseItem.expenseTitle,
                amount: this.props.expenseItem.amount,
                userName: this.props.expenseItem.userName,
                id: this.props.expenseItem._id,
            })


        }

    }

    reset = () => {
        this.setState({
            expenseTitle: '',
            amount: 0,
            id: '',
        })
    }

    submit = (event) => {
        event.preventDefault();

        const payload = {
            expenseTitle: this.state.expenseTitle,
            amount: this.state.amount,
            userName: this.props.userName

        }

        this.setState({
            expenseTitle: '',
            amount: ''
        })

        axios({
            url: 'expense/save',
            method: 'POST',
            data: payload,
            headers:{Authorization: localStorage.getItem('jwt') }
        })
            .then(() => {
                
                this.props.callbackExpenses();
            })
            .catch((err) => {
                console.log(err);
            })
    };


    edit = (event) => {
        event.preventDefault();

        const payload = {
            id: this.props.expenseItem._id,
            expenseTitle: this.state.expenseTitle,
            amount: this.state.amount,
            userName: this.props.userName
        }

        this.setState({
            expenseTitle: '',
            amount: 0,
            id: '',
        })

        axios({
            url: 'expense/edit',
            method: 'POST',
            data: payload,
            headers:{Authorization: localStorage.getItem('jwt') }
        })
            .then(() => {
              
                this.props.callbackExpenses();

            })
            .catch((err) => {
                console.log(err);
            })

    };

    displayForm() {
        if (this.state.id === this.props.expenseItem._id) {
            return (
                <form onSubmit={this.edit}>
                    <label>Položka</label>
                    <input onChange={this.handleInput}
                        value={this.state.expenseTitle}
                        className="form-control"
                        name="expenseTitle"
                        required
                    />
                    <label>Výdaje</label>
                    <input
                        onChange={this.handleInput}
                        value={this.state.amount}
                        className="form-control"
                        name="amount"
                        required
                    />
                    <button type='submit' className="btn btn-dark btn-block mt-3">Uprav</button>
                    <button type='reset' onClick={this.reset} className="btn btn-secondary btn-block mt-3">Reset</button>
                </form>
            )
        }

        return (
            <form onSubmit={this.submit}>
                <label>Položka</label>
                <input onChange={this.handleInput}
                    value={this.state.expenseTitle}
                    className="form-control"
                    name="expenseTitle"
                    required
                />
                <label>Výdaje</label>
                <input
                    onChange={this.handleInput}
                    value={this.state.amount}
                    className="form-control"
                    name="amount"
                    required
                    type='number'
                    min='1'
                />
                <button type='submit' className="btn btn-dark btn-block mt-3">Odešli</button>
                <button type='reset' onClick={this.reset} className="btn btn-secondary btn-block mt-3">Reset</button>
            </form>
        )
    }


    render() {

        console.log('State: ', this.state);

        return (

            <div className="card card-body">
                {this.displayForm()}
            </div>



        )
    }
}

export default InputExpenses