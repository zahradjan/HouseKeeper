import React from "react";
import InputNotes from "../notes/InputNotes";
import NotesList from "../notes/NotesList";


const DisplayNotes = (props) => {

    return (
        <div className="card card-body mb-3">
             <InputNotes noteItem={props.noteItem} />
             <NotesList  editNotes={props.editNotes}/>
        </div>
    )
}

export default DisplayNotes