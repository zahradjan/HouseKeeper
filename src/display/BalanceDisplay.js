import React from 'react';
import { BudgetConsumer } from '../store'
import axios from 'axios';





class BalanceDisplay extends React.Component {
    state = {
        color: ''
    }
    changeColor = () => {
        console.log('jsem tu');
        this.setState({ color: 'red' })

    }

    render() {
        return (
            <BudgetConsumer>
                {value => {
                    const totalExpenses = value.expenses.length > 0 ? (
                        value.expenses.reduce((acc, curr) => {
                            acc += parseInt(curr.amount);
                            return acc;
                        }, 0)) : 0;

                    const leftOver = (value.budget - totalExpenses);

                    return (
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header">Rozpočet</div>
                                    <div className="card-body">
                                        <h5 className="text-center card-title">{value.budget}</h5>
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

                                        <h5 className="text-center card-title" style={{ color: this.state.color }} >{this.state.leftover}</h5>
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
