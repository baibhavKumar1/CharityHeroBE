const mongoose= require('mongoose');

const connection = mongoose.connect("mongodb+srv://cocc1274:Vaibhav1@cluster0.mybcsrv.mongodb.net/charity?retryWrites=true&w=majority");

module.exports = connection;
