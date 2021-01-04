import React from 'react';
import InputBudget from './InputBudget';
import InputExpenses from './InputExpenses';
import DisplayBudget from '../display/DisplayBudget';
import axios from 'axios';

const Budget = (props) => {
    const [expensesCount, setExpensesCount] = React.useState(0);
    const [expenseItem, setExpenseItem] = React.useState('');
    const callbackExpenses = () => {
        getExpenseCount();
    }
    React.useEffect(() => {
        getExpenseCount();
    }, [])
    const getExpenseCount = () => {
        axios.get('/expense/count',{headers:{Authorization: localStorage.getItem('jwt') }})
            .then((response) => {
                const data = response.data;
                setExpensesCount(data);
            })
            .catch((err) => {
                alert(err)
            })
    }
    const  editExpense =(expense) =>{
        setExpenseItem(expense)
    }


    
    return (
        <div className="row">
            <div className="col-lg-4">
                <InputBudget callbackExpenses={callbackExpenses}/>
                <InputExpenses userName={props.userName} callbackExpenses={callbackExpenses}  expenseItem={expenseItem}/>
            </div>
            <div className="col-lg-8">
                <DisplayBudget  userName={props.userName} expensesCount={expensesCount} editExpense={editExpense} callbackExpenses={callbackExpenses} />
            </div>
        </div>

    )
}

export default Budget