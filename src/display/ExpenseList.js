import React, { Component } from 'react';
//import { BudgetConsumer } from '../store';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md';

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

    getExpense = () => {
        axios.get('/expenses')
        .then((response) => {
            const data = response.data;
            this.setState({ expenses: data })
        })
        .catch((err) => {
            alert('ERROR RETRIEVING EXPENSES')
        })
    }

    displayExpenses = (expenses) => {
        if (!expenses.length) return null;

        return expenses.map((expense, index) => (

            <tr key={index}>
                <td>{expense.expenseTitle}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleString()}</td>
                <td className='text-center'><button className='delete-btn' aria-label="delete button"><MdDelete className="btn-icon" /></button></td>
                <td className='text-center'><button className='edit-btn ' aria-label="edit button"><MdEdit className="btn-icon" /></button></td>

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