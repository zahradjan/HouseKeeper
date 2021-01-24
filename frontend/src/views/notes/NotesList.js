import React, { Component } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md';
import { IconContext } from "react-icons";

class NotesList extends Component {

    state = {
        noteTitle: '',
        description: '',
        createdAt: '',
        notes: []
    }
    componentDidMount = () => {
        this.getNotes();
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.notes === this.state.notes) {
            this.getNotes();
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }
    getNotes = () => {
        axios.get('/note/', { headers: { Authorization: localStorage.getItem('jwt') } })
            .then((response) => {
                const data = response.data;
                this.setState({ notes: data })
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
            url: '/note/delete',
            method: 'POST',
            data: payload,
            headers: { Authorization: localStorage.getItem('jwt') }
        }).then(() => {
            this.getNotes()
        })
            .catch((err) => {
                console.log(err);
            })

    }
    editItem(note) {
        this.props.editNotes(note);

    }
    deleteAll = () => {

        axios({
            url: '/note/deleteAll',
            method: 'POST',
            headers: { Authorization: localStorage.getItem('jwt') }
        }).then(() => {
            this.getNotes()
        })

            .catch((err) => {
                console.log(err);
            })




    }
    isSameUser(userName) {
        return userName === this.props.userName
    }

    displayNotes = (notes) => {
        if (notes.length === null) return

        notes.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()

        return (
            notes.map((note, index) => (
                <div className="card mt-5" key={index}>
                    <div className="card-body">

                        <h4 className="card-title">{note.noteTitle}</h4>
                        <div className="card-text mb-2">Přidáno uživatelem: {note.noteUserName}</div>
                        <div className="card-text mb-2">{new Date(note.date).toLocaleString()}</div>
                        <div className="card-text mb-2">{note.description}</div>



                        {(this.props.isLoggedInAsAdmin() || this.isSameUser(note.noteUserName)) &&
                            <button className='btn btn-success' aria-label="edit button" onClick={() => this.editItem(note)}><MdEdit /> Upravit</button>}


                        {(this.props.isLoggedInAsAdmin() || this.isSameUser(note.noteUserName)) &&
                            <button className='btn btn-danger m-3' aria-label="delete button" onClick={() => this.deleteItem(note._id)}><MdDelete /> Smazat</button>}

                    </div>
                </div>
            ))

        );

    }
    displayDAButton(notes) {
        if (!notes.length) return

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
            <div>
                {/* <div className="row"> */}

                {this.displayNotes(this.state.notes)}

                {/* </div> */}
                <div>
                    {this.props.isLoggedInAsAdmin() && this.displayDAButton(this.state.notes)}
                </div>
            </div>
        )
    }
}

export default NotesList