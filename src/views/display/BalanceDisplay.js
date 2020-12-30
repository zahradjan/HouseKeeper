import React from 'react';
import axios from 'axios';






class BalanceDisplay extends React.Component {
    state = {
        color: '',
        amount: 0,
    }
    
    componentDidUpdate(prevState){
        if(prevState.amount !== this.state.amount){
        this.getBudget();
        }
    }

    changeColor = (leftOver) => {
        return leftOver > 0 ? 'green' : 'red'
    }

    getBudget = () => {
        axios.get('/budget',{headers:{Authorization: localStorage.getItem('jwt') }})
            .then((response) => {
                const data = response.data.amount;
                this.setState({ amount: data })
            })
            .catch((err) => {
                alert(err)
            })
    }



    render() {
        const leftOver = this.state.amount - this.props.expensesCount;

        return (
            <div className="row">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header">Rozpočet</div>
                        <div className="card-body">
                            <h5 className="text-center card-title">{this.state.amount}</h5>
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
    }
}

export default BalanceDisplay
