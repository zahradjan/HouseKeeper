import React, { Component } from 'react';
import axios from 'axios';


class InputExpenses extends Component {
   
    state = {
        expenses: [],
        expenseTitle: '',
        amount: 0,
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   
    

    componentDidUpdate(prevProps) {
        if (prevProps.expenseItem.expenseTitle !== this.props.expenseItem.expenseTitle) {
            console.log('id: ' + this.props.expenseItem._id)
            console.log('title: ' + this.props.expenseItem.expenseTitle)
            console.log('amount: ' + this.props.expenseItem.amount)
            this.setState({
                expenseTitle: this.props.expenseItem.expenseTitle,
                amount: this.props.expenseItem.amount
            })
           
           
        }

    }

    reset = () => {
        this.setState({
            expenseTitle: '',
            amount: ''
        })
    }



    getExpenses = () => {
        axios.get('/api')
            .then((response) => {
                const data = response.data;
                this.setState({ expenses: data });
                console.log('Data has been received!')
            })
            .catch((err) => {
                alert('Error retrieving')
            })
    }

    submit = (event) => {
        event.preventDefault();

        const payload = {
            expenseTitle: this.state.expenseTitle,
            amount: this.state.amount
        }

        this.setState({
            expenseTitle: '',
            amount: ''
        })

        axios({
            url: 'api/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                this.getExpenses();
                this.props.callbackExpenses();
            })
            .catch(() => {
                console.log('ERROR');
            })
    };


    edit = (event) => {
        event.preventDefault();

        const payload = {
            id:this.props.expenseItem._id,
            expenseTitle: this.state.expenseTitle,
            amount: this.state.amount
        }

        this.setState({
            expenseTitle: '',
            amount: ''
        })

        axios({
            url: 'api/edit',
            method: 'POST',
            data: payload
        })
            .then(() => {
                this.getExpenses();
                this.props.callbackExpenses();
            })
            .catch(() => {
                console.log('ERROR');
            })
    
    };

    render() {

        console.log('State: ', this.state);

        return (




            <div className="card card-body">
                <form onSubmit={this.submit}
                >
                    <label>Položka</label>
                    <input onChange={this.handleInput}
                        value={this.state.expenseTitle}
                        className="form-control"
                        name="expenseTitle"
                        required
                    />
                    <label>Výdaje</label>
                    <input
                        onChange={this.handleInput}
                        value={this.state.amount}
                        className="form-control"
                        name="amount"
                        required
                    />
                    <button type='submit' className="btn btn-dark btn-block mt-3">Submit</button>
                    <button type='reset' onClick={this.reset} className="btn btn-secondary btn-block mt-3">Reset</button>
                </form>
                <form onSubmit={this.edit}
                >
                    <label>Položka</label>
                    <input onChange={this.handleInput}
                        value={this.state.expenseTitle}
                        className="form-control"
                        name="expenseTitle"
                        required
                    />
                    <label>Výdaje</label>
                    <input
                        onChange={this.handleInput}
                        value={this.state.amount}
                        className="form-control"
                        name="amount"
                        required
                    />
                    <button type='submit' className="btn btn-dark btn-block mt-3">Submit</button>
                    <button type='reset' onClick={this.reset} className="btn btn-secondary btn-block mt-3">Reset</button>
                </form>
            </div>



        )
    }
}

export default InputExpenses