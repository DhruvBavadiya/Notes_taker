import React, { useContext, useRef, useState,useEffect } from 'react'
import noteContext from '../Context/Notes/noteContext'
import Notesitem from './Notesitem';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    // used context.
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const [note, setnote] = useState({ id: "", etitle: "", ediscription: "", etag: "" })
    // assign value to the notes using context.
    const { notes, getnotes, editnote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    useEffect(() => {
        if(localStorage.getItem("token")){
            getnotes()
        }
        else{
            navigate('/login')
        }
    }, []);    
    const handle = (e) => {
        // console.log(note)
        refClose.current.click();
        editnote(note.id, note.etitle, note.ediscription, note.etag);
        e.preventDefault();
    }

    const changed = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }


    const updatenote = (currentnote) => {
        ref.current.click();
        setnote({ id: currentnote._id, etitle: currentnote.title, ediscription: currentnote.discription, etag: currentnote.tag });
        // console.log();
        // console.log("clicked", note);
    }
    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                                    <input required minLength={5} type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={changed} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">discription</label>
                                    <input required minLength={5} type="text" className="form-control" id="ediscription" name="ediscription" value={note.ediscription} onChange={changed} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={changed} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handle} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-3'>
                <div className='row'>
                    <h2>See Notes</h2>
                    {notes.length === 0  && "no notes to display"}
                    {Array.isArray(notes) &&
                        notes.map((notes) => (
                          <Notesitem key={notes._id} updateNote={updatenote} notes={notes} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Notes
