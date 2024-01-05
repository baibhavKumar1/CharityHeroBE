const mongoose =require('mongoose');

const noteSchema= mongoose.Schema(
    {
        title:String,
        body:String
    },
    {versionKey:false}
)

const Note = mongoose.model('Note',noteSchema)

module.exports= Note