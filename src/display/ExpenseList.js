import React, { Component } from 'react';
import { BudgetConsumer } from '../store';
import { MdEdit, MdDelete } from 'react-icons/md';


class ExpenseList extends Component {

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
                    <BudgetConsumer>
                        {value => {
                            const expenseList = value.expenses.length > 0 ? (value.expenses.map((expense, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{expense.title}</td>
                                        <td>{expense.amount}</td>
                                        <td>{expense.date}</td>
                                        <td className='text-center'><button className='delete-btn' aria-label="delete button"><MdDelete className="btn-icon" /></button></td>
                                        <td className='text-center'><button className='edit-btn ' aria-label="edit button"><MdEdit className="btn-icon" /></button></td>
                                      
                                    </tr>
                                )
                                
                            })
                 
                            )

                                : (
                                    <tr>
                                        <td>Nebyli zadané žádné výdaje</td>
                                        <td>0</td>
                                    </tr>
                                )
                            return <tbody>{expenseList}</tbody>
                        }}
                    </BudgetConsumer>


                </table>
            </div>
        )
    }
}

export default ExpenseList