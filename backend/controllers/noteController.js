const asynchandler = require("express-async-handler");
const Note = require("../models/noteModel");


//Fatch All Notes
const fatchNotes = asynchandler(async (req, res)=>{
    const notes = await Note.find()

    if(notes){
        res.status(200).json(notes)
    }else{
        res.status(401)
        throw new Error("Not found notes")
    }
})


//Fatch Note By ID
const fatchNotebyid = asynchandler(async (req, res)=>{
    const note = await Note.findById(req.params.id);

    if(note){
        res.status(200).json(note);
    }else{
        res.status(401)
        throw new Error("Not found notes")
    }

    
})


//Create Notes
const createNotes = asynchandler(async (req, res) => {
    const { title, content, category } = req.body;
    const notes = await Note.create({ title, content, category, createdBy: req.user._id });

    if (notes) {
        res.status(200).json(notes);
    } else {
        res.status(401);
        throw new Error("note creating faild");
    }
});


//Update Note
const updateNote = asynchandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    console.log(note)
    if (note) {
        const { title, content, category } = req.body;
        const notes = await Note.findByIdAndUpdate(
          req.params.id,
          { title, content, category },
          { returnOriginal: false }
        );
        res.status(200).json(notes);
    } else {
        res.status(401);
        throw new Error("note Update faild");
    }
});


//Delete Note
const deleteNote = asynchandler(async (req, res) => {
    const note = await Note.findByIdAndRemove( req.params.id );
    
    if (note) {
        res.status(200).send("done");
    } else {
        res.status(401);
        throw new Error("note Update faild");
    }
});

module.exports = { fatchNotes, createNotes, fatchNotebyid, updateNote,  deleteNote};