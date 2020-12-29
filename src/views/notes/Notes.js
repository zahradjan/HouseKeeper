import React from 'react';
import { IconContext } from "react-icons";
import { MdAddBox } from "react-icons/md";
import DisplayNotes from '../display/DisplayNotes';

const Notes = (props) => {

    const [noteItem, setNoteItem] = React.useState('');
    const [isHidden, setVisibility] = React.useState(true);
    const editNotes = (note) => {
        setNoteItem(note)
    }
    const setVisible = () => {
        setVisibility(!isHidden);
    }

    return (
        <div className="row">
            <div className="col">
                <div className="card card-body mb-3">
                    <div className="row">
                        <div className="col">
                            <h3>Poznámky</h3>
                        </div>
                        <div className="col-auto">
                            <IconContext.Provider value={{ className: "add-buttons" }}>
                                <button type='submit' className="btn btn-primary " onClick={setVisible}><MdAddBox className="btn-icon" />  Přidat</button>
                            </IconContext.Provider>
                        </div>
                    </div>

                    <DisplayNotes  userName={props.userName} editNotes={editNotes} noteItem={noteItem}  isHidden={isHidden}/>


                </div>
            </div>
        </div >
    )
}

export default Notes