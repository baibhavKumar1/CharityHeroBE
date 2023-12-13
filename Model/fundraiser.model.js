const mongoose= require('mongoose');
const fundraiserSchema = mongoose.Schema(
    {
        title:String,
        category:String,
        description:String,
        amount:Number,
        raised:{type:Number,default:0},
        userID:String,
        funders:[String]
    },
    {versionKey:false}
)

const FundraiserModel = mongoose.model("Fundraiser",fundraiserSchema);

module.exports= FundraiserModel