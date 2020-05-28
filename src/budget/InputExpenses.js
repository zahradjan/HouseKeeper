import React, { Component } from 'react';

class InputExpenses extends Component {
    render() {
        return (
            <div className="card card-body">
                <form>
                    <label>Expenses</label>
                    <input 
                        className="form-control"
                        name="expenseTitle"
                    />
                    <label>Amount</label>
                    <input 
                        className="form-control"
                        name="amount"
                    />
                    <button className="btn btn-dark btn-block mt-3">Submit</button>
                </form>
            </div>

        )
    }
}

export default InputExpenses