import React, { Component } from 'react';
import axios from 'axios';
import { BudgetConsumer } from '../store'

var style = {
    color: 'black',
    writable: true,
};

class BalanceDisplay extends Component {
 
    state = {
        budget:'',
        total: '',
        expenses: []
    }

    componentDidMount = () => {
        this.getBudget();
        this.getExpenses();
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
            this.setState({expenses: data})
        })
        .catch((err) => {
            alert('ERROR RETRIEVING EXPENSES')
        })
    }

    totalExpenses = () => {
        let total = 0;

        this.state.expenses.forEach(expense => {
            total = total + parseInt(expense.amount);
        })

        return total;
    }

render() {

    let total = this.totalExpenses();

    return (
        <BudgetConsumer>
            {value => {
                console.log('Budget in render: ', this.state.budget)
                console.log('Total in render: ', total)
                const leftOver = (parseInt(this.state.budget) - parseInt(total));
                console.log('LEFTOVER: ', leftOver);
                const changeColor = () => {

                    if (!leftOver.toString().includes('-')) {

                        style = {
                            color: 'red'
                        }

                    } else {

                        style = {
                            color: 'green'
                        }

                    }
                }
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
                <h5 className="text-center card-title">{this.totalExpenses()}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header"> Celkový Zůstatek</div>
                            <div className="card-body">
                               <h5 className="text-center card-title" style={style} onChange={changeColor()}>{leftOver}</h5>
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
