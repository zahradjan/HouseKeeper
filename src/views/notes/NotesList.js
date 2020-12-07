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
    componentDidUpdate(prevState) {
        if (prevState.notes !== this.state.notes) {
            this.getNotes();
        }
    }

    getNotes = () => {
        axios.get('/note/')
            .then((response) => {
                const data = response.data;
                this.setState({ notes: data })
            })
            .catch((err) => {
                alert('ERROR RETRIEVING')
            })
    }
    deleteItem = (id) => {
        axios.post('/note/delete', { id })
            .then(() => {
                // this.props.callbackNotes();
            })
            .catch((err) => {
                alert('ERROR RETRIEVING')
            })

    }
    editItem(note) {
        this.props.editNotes(note);
    }
    deleteAll = () => {

        axios.post('/note/deleteAll')
            .then(() => {
                // this.props.callbackNotes();

            })
            .catch((err) => {
                alert('ERROR RETRIEVING')
            })

    }
    displayNotes = (notes) => {
        if (notes.length === null) return

        notes.sort((a,b) => new Date(a.date)-new Date(b.date)).reverse()
      
        return (
            notes.map((note, index) => (
                <div className="card mt-5">
                    <div className="card-body" key={index}>

                        <h4 className="card-title">{note.noteTitle}</h4>
                        <div className="card-text mb-2">{new Date(note.date).toLocaleString()}</div>

                        {/* <div className="card-subtitle text-muted mb-2"></div> */}
                        <div className="card-text mb-2">{note.description}</div>
                      
                     
                        {/* <IconContext.Provider value={{ className: "edit-buttons" }}> */}
                            <button className='btn btn-success' aria-label="edit button" onClick={() => this.editItem(note)}><MdEdit /> Upravit</button>
                        {/* </IconContext.Provider> */}

                        {/* <IconContext.Provider value={{ className: "delete-buttons" }}> */}
                            <button className='btn btn-danger m-3' aria-label="delete button" onClick={() => this.deleteItem(note._id)}><MdDelete /> Smazat</button>
                        {/* </IconContext.Provider> */}
                    </div>
                </div>
            ))

        );

    }
    displayDAButton(notes) {
        if (notes.length === null) return

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
                    {this.displayDAButton(this.state.notes)}
                </div>
            </div>
        )
    }
}

export default NotesList