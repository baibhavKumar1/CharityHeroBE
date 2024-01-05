const express = require('express');
const Note= require('../Model/note.model');
const NoteRouter = express.Router();

NoteRouter.get('/',async(req,res)=>{
    console.log(req.body)
    try{
        const note= await Note.find();
    res.status(200).send(note)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

NoteRouter.post('/create',async(req,res)=>{
    const {title,body}= req.body;
    try{ 
        const note = await Note({
            title,body
        });
        note.save();
        res.status(200).send(note)
    }catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
})
NoteRouter.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const deleted = await Note.findByIdAndDelete(id);
        res.status(200).send(deleted);
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports= NoteRouter