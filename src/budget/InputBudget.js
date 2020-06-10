import React, { Component } from 'react';
import axios from 'axios';
import {BudgetConsumer} from '../store'


class InputBudget extends Component {
    
    state = {
        amount:''
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (dispatch,e) => {
        e.preventDefault()
        dispatch({
            type:"ADD_BUDGET",
            amount:this.state.amount
        })
    }

    submit = (event) => {
        event.preventDefault();

        const payload = {
            amount: this.state.amount
        }

        this.setState({
            amount: ''
        })

        axios({
            url: 'budgets/save',
            method: 'POST',
            data: payload
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
                    return (
                        <div className="card card-body mb-3">  
                        <label>Rozpočet</label>
                        <form className="form-inline" onSubmit={this.handleSubmit.bind(this,dispatch) && this.submit}>
                            
                            <input 
                                onChange={this.handleInput}
                                value={this.state.budget}
                                className="form-control mr-2"
                                name="amount"
                            />
                            <button className="btn btn-dark">Odešli</button>
                        </form>
                    </div>
                    )
                }}
            </BudgetConsumer>
           
        )
    }
}

export default InputBudget