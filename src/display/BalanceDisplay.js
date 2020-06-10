import React, { Component } from 'react';
import axios from 'axios';
import { BudgetConsumer } from '../store'

class BalanceDisplay extends Component {
 
    state = {
        budget:'',
        expenses: []
    }

    componentDidMount = () => {
        this.getBudget();
        this.getExpenses();
        //this.totalExpenses();
    }

    getBudget = () => {
        axios.get('/budgets')
        .then((response) => {
            const data = response.data[0].amount;
            this.setState({ budget: data })
        })
        .catch((err) => {
            alert('ERROR RETRIEVING BUDGET')
        })
    }

    getExpenses = () => {
        axios.get('/expenses')
        .then((response) => {
            const data = response.data;
            console.log('EXPENSES: ', data)
            this.setState({expenses: data})
        })
        .catch((err) => {
            alert('ERROR RETRIEVING EXPENSES')
        })
    }

render() {

    return (
        <BudgetConsumer>
            {value => {
                const totalExpenses = value.expenses.length > 0 ? ( 
                    value.expenses.reduce((acc,curr) => {
                        acc += parseInt(curr.amount);
                        return acc;
                    }, 0)) :0;
                    return(
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">Rozpočet</div>
                            <div className="card-body">
                                <h5 className="text-center card-title">{this.state.budget}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header"> Celkové Výdaje</div>
                            <div className="card-body">
                <h5 className="text-center card-title">{totalExpenses}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header"> Celkový Zůstatek</div>
                            <div className="card-body">
                                <h5 className="text-center card-title">{this.state.budget - totalExpenses}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }}
        </BudgetConsumer>
    )
}
}

export default BalanceDisplay
