import React from 'react';
import InputBudget from './InputBudget';
import InputExpenses from './InputExpenses';
import DisplayBudget from '../display/DisplayBudget';
import ExpenseList from '../display/ExpenseList';
import axios from 'axios';

const Budget = (props) => {
    const [expensesCount, setExpensesCount] = React.useState(0);
    const [budget, setBudget] = React.useState(0);
    const [expenseItem, setExpenseItem] = React.useState('');
    const [expensesChange, setExpenseChange] = React.useState(false);

    const budgetChanged = (budget) =>{
        setBudget(budget)
    }
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


    const expensesChanged = () =>{
        console.log(expensesChange)
        setExpenseChange(!expensesChange)
    }

//    const getExpense = () => {
//         axios.get('/expense/', {headers:{Authorization: localStorage.getItem('jwt') }})
//             .then((response) => {
//                 const data = response.data;
             
//                 setExpenses( data )
//             })
//             .catch((err) => {
//                 alert(err)
//             })
//     }


    
    return (
        <div className="row">
            <div className="col-lg-4">
               {props.isLoggedInAsAdmin() && <InputBudget callbackExpenses={callbackExpenses} budgetChanged={budgetChanged}/>}
                <InputExpenses userName={props.userName} callbackExpenses={callbackExpenses}  expenseItem={expenseItem} expensesChanged={expensesChanged}/>
            </div>
            <div className="col-lg-8">
            <div className="card card-body">
                <DisplayBudget  budget={budget} expensesChange={expensesChange}   isLoggedInAsAdmin={props.isLoggedInAsAdmin} userName={props.userName} expensesCount={expensesCount} editExpense={editExpense} callbackExpenses={callbackExpenses} expensesChanged={expensesChanged}  />
                
            </div>
           
            </div>
        </div>

    )
}

export default Budget