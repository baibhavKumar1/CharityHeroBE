const mongoose = require('mongoose');

const blacklistSchema = mongoose.Schema(
    {
        token:[String]
    }
)

const BlacklistModel= mongoose.model("Blacklist",blacklistSchema);

module.exports= BlacklistModel;