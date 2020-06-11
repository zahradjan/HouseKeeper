import React, { Component } from 'react';
//import { BudgetConsumer } from '../store';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md';
import { IconContext } from "react-icons";

class ExpenseList extends Component {

    state = {
        expenseTitle: '',
        amount: '',
        date: '',
        expenses: []
    }
    componentDidMount = () => {
        this.getExpense();
    }
    componentDidUpdate(prevState)  {
        if (prevState.expenses !== this.state.expenses) {
            this.getExpense();
    }
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

    displayExpenses = (expenses) => {
        if (!expenses.length) return null;

        return expenses.map((expense, index) => (

            <tr key={index}>
                <td>{expense.expenseTitle}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleString()}</td>
                <IconContext.Provider value={{ className: "delete-buttons" }}>
                <td className='text-center'><button className='btn btn-link' aria-label="delete button"><MdDelete className="btn-icon" /></button></td>
                </IconContext.Provider>
                <IconContext.Provider value={{  className: "edit-buttons" }}>
                <td className='text-center'><button className='btn btn-link ' aria-label="edit button"><MdEdit className="btn-icon" /></button></td>
                </IconContext.Provider>

            </tr>
        ));
    }

    render() {

        return (
            <div className="card mt-5">
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>Položka</th>
                            <th>Výdaje</th>
                            <th>Datum</th>
                        </tr>
                    </thead>

                    <tbody>{this.displayExpenses(this.state.expenses)}</tbody>
                </table>
            </div>
        )
    }
}

export default ExpenseList