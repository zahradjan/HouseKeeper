import React from 'react';
import DisplayNotes from '../display/DisplayNotes';

const Notes = (props) => {

    const [noteItem, setNoteItem] = React.useState('');
   
    const editNotes = (note) => {
        setNoteItem(note)
    }
  

    return (
        <div className="row">
            <div className="col">
                <div className="card card-body mb-3">
                    <div className="row">
                        <div className="col">
                            <h3>Poznámky</h3>
                        </div>
                    </div>

                    <DisplayNotes isLoggedInAsAdmin={props.isLoggedInAsAdmin} userName={props.userName} editNotes={editNotes} noteItem={noteItem} />


                </div>
            </div>
        </div >
    )
}

export default Notes