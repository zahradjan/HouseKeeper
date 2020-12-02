import React, { Component } from 'react';
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
    componentDidUpdate(prevState) {
        if (prevState.expenses !== this.state.expenses) {
            this.getExpense();
        }
    }

    getExpense = () => {
        axios.get('/expense/')
            .then((response) => {
                const data = response.data;
                this.setState({ expenses: data })
            })
            .catch((err) => {
                alert('ERROR RETRIEVING')
            })
    }
    deleteItem = (id) => {
        axios.post('/expense/delete', { id })
            .then(() => {
                this.props.callbackExpenses();
            })
            .catch((err) => {
                alert('ERROR RETRIEVING')
            })

    }
    editItem(expense){
        this.props.editExpense(expense);
    }
    deleteAll = () => {

        axios.post('/expense/deleteAll')
            .then(() => {
                this.props.callbackExpenses();
             
            })
            .catch((err) => {
                alert('ERROR RETRIEVING')
            })

    }
    displayExpenses = (expenses) => {
        if (!expenses.length) return null;

        expenses.sort((a,b) => new Date(a.date)-new Date(b.date)).reverse()
      
        return expenses.map((expense, index) => (

            <tr key={index}>
                <td>{expense.expenseTitle}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleString()}</td>
                <IconContext.Provider value={{ className: "delete-buttons" }}>
                    <td className='text-center'><button className='btn btn-link' aria-label="delete button" onClick={() => this.deleteItem(expense._id)}><MdDelete className="btn-icon" /></button></td>
                </IconContext.Provider>
                <IconContext.Provider value={{ className: "edit-buttons" }}>
                    <td className='text-center'><button className='btn btn-link ' aria-label="edit button" onClick={() => this.editItem(expense)}><MdEdit className="btn-icon" /></button></td>
                </IconContext.Provider>

            </tr>

        ));
    }
    displayDAButton(expenses) {
        if (!expenses.length) return null;

        return (
            <div className="text-center">
                  <IconContext.Provider value={{ className: "delete-button-all" }}>
                <button className='btn btn-danger m-3' aria-label="delete button" onClick={() => this.deleteAll()}><MdDelete className="btn-icon" /> Smazat Vše</button>
                </IconContext.Provider>
            </div>

        )



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

                    <tbody>
                        {this.displayExpenses(this.state.expenses)}


                    </tbody>

                </table>
                {this.displayDAButton(this.state.expenses)}
            </div>
        )
    }
}

export default ExpenseList