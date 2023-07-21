import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
import { json } from "react-router-dom";
const NoteState = (props) => {
  const host = "http://localhost:12000"
  const noteInitial = []

  const [notes, setnotes] = useState(noteInitial)

  // For get notes
  const getnotes = async () => {
    console.log("from notestate",localStorage.getItem("token"));
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      }
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
    // console.log(json)
  }

  // For add not:
  const addnote = async (title, discription, tag) => {
    // API calls:

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, discription, tag })
    });
    const note = await response.json();
    setnotes(notes.concat(note))

    console.log(json);
    console.log("adding new note")

  }
  const deletenote = async (id) => {
    // console.log("deleted :" +id);
    const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json)
    const newItem = notes.filter((notes) => { return notes._id != id })
    setnotes(newItem);
  }
  const editnote = async (id, title, discription, tag) => {
    // API calls:

    const response = await fetch(`${host}/api/notes//updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, discription, tag })
    });
    const json = await response.json();
    let newnotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit note
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].discription = discription;
        newnotes[index].tag = tag;
        break;
      }
    }
    setnotes(newnotes);
  }

  



  return (
    // provide context.
    <noteContext.Provider value={{ notes, addnote, deletenote, getnotes, editnote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
// // created state.
// const s1={
//     "name":"Dhruv",
//     "class":"11"
// }

// const [state,setState] = useState(s1);
// // created update function.
// const update = ()=>{
//     setTimeout(() => {
//         // change the previous state.
//         setState({
//             "name":"Dhruv Bavadiya",
//             "class":"12"
//         })
//     }, 1000);
// }