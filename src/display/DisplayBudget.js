import React from "react";
import BalanceDisplay from './BalanceDisplay';
import ExpenseList from './ExpenseList';

const DisplayBudget = (props) => {
    return (
        <div className="card card-body">
            <h3 className="text-center">Informace o rozpočtu</h3>
            <BalanceDisplay expensesCount={props.expensesCount} />
            <ExpenseList callbackExpenses={props.callbackExpenses}/>
        </div>
    )
}

export default DisplayBudget