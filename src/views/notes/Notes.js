import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { MdAddBox } from "react-icons/md";
import InputNotes from './InputNotes';
import NotesList from './NotesList';

class Notes extends Component {


    displayNotes = () => {
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col">
                        <h3>Poznámky</h3>
                    </div>
                    <div className="col-auto">
                        <IconContext.Provider value={{ className: "add-buttons" }}>
                            <button type='submit' className="btn btn-primary "><MdAddBox className="btn-icon" />  Přidat</button>
                        </IconContext.Provider>
                    </div>
                </div>
                <div className="card card-body mb-3">
                    <InputNotes />

                    <NotesList />
                </div>

            </div>



        )
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    {this.displayNotes()}
                </div>
            </div >
        )
    }
}

export default Notes