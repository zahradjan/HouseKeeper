import React from 'react';
import { BudgetConsumer } from '../store'






class BalanceDisplay extends React.Component {
    state = {
        color: '',



    }
    changeColor = (leftOver) => {
        return leftOver > 0 ? 'green' : 'red'
    }



    render() {

        return (
            <BudgetConsumer>
                {value => {

                    const leftOver = value.budget - this.props.expensesCount;

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
                                        <h5 className="text-center card-title">{this.props.expensesCount}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header"> Celkový Zůstatek</div>
                                    <div className="card-body">

                                        <h5 className="text-center card-title" style={{ color: this.changeColor(leftOver) }} >{leftOver}</h5>
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
