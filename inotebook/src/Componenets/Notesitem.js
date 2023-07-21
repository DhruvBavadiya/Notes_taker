import React, { useContext } from 'react'
import noteContext from '../Context/Notes/noteContext'
const Notesitem = (props) => {
    const context = useContext(noteContext);
    const { notes,updateNote } = props;
    const { deletenote } = context;
    return (
        <div className='col-md-3'>
            <div className="card">
                <div className="card-body">
                <div className='d-flex align-items-center'>
                <h5 className="card-title">{notes.title}</h5>
                    <i className="fa-solid fa-trash mx-3" onClick={()=>{
                        deletenote(notes._id)
                    }}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{
                        updateNote(notes)
                    }}></i>
                    </div>
                    <p className="card-text">{notes.discription}</p>
                </div>
            </div>
        </div>
    )
}

export default Notesitem
