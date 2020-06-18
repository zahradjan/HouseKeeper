import React, { Component } from 'react';

import axios from 'axios';

const BudgetContext = React.createContext();



const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_BUDGET":
            return {
                ...state,
                budget: action.budget
            };
        case "ADD_EXPENSES":
            return {
                ...state,
                expenses: action.expenses
            }
        default:
            return state
    }
}

class BudgetProvider extends Component {

    state = {
        budget: 0,
        expenses: [
        ],
        dispatch: action => this.setState(state => reducer(state, action))
    }

    componentDidMount = () => {
        this.getExpense();
    }

    getExpense = () => {
        axios.get('/api')
        .then((response) => {
            const data = response.data;
            this.setState({ expenses: data })
        })
        .catch((err) => {
            alert('ERROR RETRIEVING')
        })
    }
    getExpense = () => {
        axios.get('/api/budget')
        .then((response) => {
            const data = response.data;
            this.setState({ budget: data })
        })
        .catch((err) => {
            alert('ERROR RETRIEVING')
        })
    }
    render() {
        return (
            <BudgetContext.Provider value={this.state}>
                {this.props.children}
            </BudgetContext.Provider>
        )
    }
}

const BudgetConsumer = BudgetContext.Consumer;

export { BudgetProvider, BudgetConsumer }