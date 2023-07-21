const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1: To get all notes using login user data.


router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        // create notes to find all notes using user id.
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

// Route 2: To add notes using /notes/addnotes.

router.post('/addnotes', fetchuser, [
    //validators.
    body('title', 'name is not long').isLength({ min: 2 }),
    body('discription', 'password is not long').isLength({ min: 5 })
], async (req, res) => {
    try {
        //decentralized every thing in Note:
        const { title, discription, tag } = req.body;
        // for finding errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        // make new note to save it in name of user.
        const note = new Note({
            title, discription, tag, user: req.user.id
        })
        const Savednote = await note.save()
        res.json(Savednote);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

// Update note using put method /api/notes/updatenotes.

router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    try {
        const {title, discription, tag } = req.body;

// Creating New note:
        const newNote = {}
        if(title){newNote.title = title}
        if(discription){newNote.discription = discription}
        if(tag){newNote.tag = tag}
// finding id of note.
        let note = await Note.findById(req.params.id)
// checking if note of give n id id there or not?
        if(!note){
            return res.status(404).send("note is not found")
        }
// checking if user is there or not.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed")
        }
// updating note.
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }

})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        const {title, discription, tag } = req.body;
// finding id of note.
        let note = await Note.findById(req.params.id)
// checking if note of give n id id there or not?
        if(!note){
            return res.status(404).send("not found")
        }
// checking if user is there or not.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed")
        }
// deleting note.
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"succsess":"note is been deleted"});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }

})

module.exports = router