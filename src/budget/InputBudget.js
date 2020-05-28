import React, { Component } from 'react';

class InputBudget extends Component {
    render() {
        return (
            <div className="card card-body mb-3">
                <label>Your Budget</label>
                <form className="form-inline">
                    <input 
                        className="form-control mr-2"
                        type="number"
                    />
                    <button className="btn btn-dark">Submit</button>
                </form>
            </div>
        )
    }
}

export default InputBudget