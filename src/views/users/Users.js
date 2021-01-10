import React, { Component } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { IconContext } from "react-icons";


class Users extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        role:'',
        users: []
    }
    componentDidMount = () => {
        this.getUsers();
    }
    componentDidUpdate(prevState) {
        if (prevState.expenses !== this.state.expenses) {
            this.getExpense();
        }
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = ()=>{
            return;
        };
    }

    getUsers = () => {
        axios.get('/users/', {headers:{Authorization: localStorage.getItem('jwt') }})
            .then((response) => {
                const data = response.data;
                this.setState({ users: data })
            })
            .catch((err) => {
                alert(err)
            })
    }
    deleteItem = (id) => {
        const payload = {
            id: id
        }
        axios({
            url: '/users/delete',
            method: 'POST',
            data: payload,
            headers:{Authorization: localStorage.getItem('jwt') }
        })
        .then(() => {
            // this.props.callbackExpenses();
        })
        .catch((err) => {
            alert(err)
        })
    }
    // editItem(expense){
    //     this.props.editExpense(expense);
    // }
    deleteAll = () => {
        axios({
            url: '/users/deleteAll',
            method: 'POST',
            headers:{Authorization: localStorage.getItem('jwt') }
        })
        .then(() => {
            // this.props.callbackExpenses();
         
        })
        
        .catch((err) => {
            alert(err)
        })

     
    }

    isSameUser(userName) {
        return userName === this.props.userName
    }

    displayExpenses = (users) => {
        if (!users.length) return null;

      
        return users.map((user, index) => (
                
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <IconContext.Provider value={{ className: "delete-buttons" }}>
                    <td className='text-center'><button className='btn btn-link' aria-label="delete button" onClick={() => this.deleteItem(user._id)}><MdDelete className="btn-icon" /></button></td>
                </IconContext.Provider>
             
            </tr>

        ));
    }
    displayDAButton(users) {
        if (!users.length) return null;

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
                            <th>Jméno</th>
                            <th>Email</th>
                            <th>Heslo</th>
                            <th>Role</th>
                                                 
                        </tr>
                    </thead>

                    <tbody>
                        {this.displayExpenses(this.state.users)}


                    </tbody>

                </table>
                {this.displayDAButton(this.state.users)}
            </div>
        )
    }
}

export default Users