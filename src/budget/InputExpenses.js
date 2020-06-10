import React, { Component } from 'react';
import axios from 'axios';
import {BudgetConsumer} from '../store'

class InputExpenses extends Component {
    state = {
        expenses:[],
        expenseTitle:'',
        amount:''
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(dispatch,e)=>{
        e.preventDefault()
        dispatch({
            type:"ADD_EXPENSES",
            expenses:this.state.expenses
        })
    }

    reset = () => {
        this.setState({
            expenseTitle: '',
            amount: ''
        })
    }

    addExpenses = () =>{
        this.setState({
            expenses:[
                ...this.state.expenses,
                {title:this.state.expenseTitle, amount: this.state.amount}
            ],
            expenseTitle:'',
            amount:''
        })
    }

    getExpenses = () => {
        axios.get('/api')
        .then((response) => {
            const data = response.data;
            this.setState({ expenses: data});
            console.log('Data has been received!')
        })
        .catch((err) => {
            alert('Error retrieving')
        })
    }

    submit = (event) => {
        event.preventDefault();

        const payload = {
            expenseTitle: this.state.expenseTitle,
            amount: this.state.amount
        }

        this.setState({
            expenseTitle: '',
            amount: ''
        })

        axios({
            url: 'api/save',
            method: 'POST',
            data: payload
        })
        .then(() => {
            this.getExpenses();
        })
        .catch(() => {
            console.log('ERROR');
        })
    };

    

    render() {

        console.log('State: ', this.state);

        return (
            <BudgetConsumer>  
                {value => {
                    const {dispatch} = value
                    return(
                        <div className="card card-body">
                <form onSubmit={this.handleSubmit.bind(this,dispatch) && this.submit}
                        /*onSubmit={this.submit}*/>
                    <label>Položka</label>
                    <input onChange ={this.handleInput}
                        value={this.state.expenseTitle} 
                        className="form-control"
                        name="expenseTitle" 
                        required
                    />
                    <label>Výdaje</label>
                    <input 
                    onChange ={this.handleInput}
                    value={this.state.amount} 
                        className="form-control"
                        name="amount"
                        required
                    />
                    <button className="btn btn-dark btn-block mt-3">Submit</button>
                </form>
            </div>
                    )
                }}
            </BudgetConsumer>
        )
    }
}

export default InputExpenses