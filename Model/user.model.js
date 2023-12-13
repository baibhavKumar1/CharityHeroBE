const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:String,
        email:String,
        pass:String,
        funded:Number
    },{versionKey:false}
)

const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel