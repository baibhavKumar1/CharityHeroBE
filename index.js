const express = require('express');
const connection = require('./db');
const cors = require('cors');
const UserRouter = require('./Route/user.route');
const FundraiserRouter = require('./Route/fundraiser.route');
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users",UserRouter);
app.use("/fundraiser",FundraiserRouter);

app.get('/',async(req,res)=>{
    res.status(200).send("On")
})

app.listen(3000,async()=>{
    try {
        await connection;
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
})
 