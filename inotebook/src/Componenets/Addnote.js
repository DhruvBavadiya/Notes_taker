import React, { useContext, useState } from 'react'
import noteContext from '../Context/Notes/noteContext'
import Alert from './Alert';

const Addnote = () => {
    const context = useContext(noteContext);
    // assign value to the notes using context.
    const { notes, addnote } = context;
    const [note, setnote] = useState({ title: "", discription: "", tag: "" })
    const handle = (e) => {
        addnote(note.title,note.discription,note.tag)
        e.preventDefault();
    }

    const changed = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <Alert message="hello" />
            <h1>Add note</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                    <input required minLength ={3}  type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={changed} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">discription</label>
                    <input required minLength={5} type="text" className="form-control" id="discription" name="discription" onChange={changed} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={changed} />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handle}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote
