import React from "react";
import InputNotes from "../notes/InputNotes";
import NotesList from "../notes/NotesList";


const DisplayNotes = (props) => {
    const [notesChange, setNotesChange] = React.useState(false);

    const callbackNotes = () => {
        setNotesChange(!notesChange)
    }
    return (
        <div className="card card-body mb-3">
            <InputNotes noteItem={props.noteItem} userName={props.userName} callbackNotes={callbackNotes} />
            <NotesList isLoggedInAsAdmin={props.isLoggedInAsAdmin} userName={props.userName} editNotes={props.editNotes} callbackNotes={callbackNotes} />
        </div>
    )
}

export default DisplayNotes