const express= require('express');
const FundraiserRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const UserModel = require('../Model/user.model');
const FundraiserModel = require('../Model/fundraiser.model');
const auth = require('../Middleware/auth.middleware');
require('dotenv').config();


FundraiserRouter.get('/',async(req,res)=>{
    const {userID} = req.body;
    try{
        const data = await FundraiserModel.find({userID});
        res.status(200).send(data)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

FundraiserRouter.post("/create", auth, async (req, res) => {
    const { title } = req.body;
    try {
      let existing_title = await FundraiserModel.findOne({ title: title });
      if (existing_title) {
        res.status(400).json({ message: "The donation request already exist" });
      } else {
        const donationRequest = await FundraiserModel.create(req.body);
        donationRequest.save();
        res.status(201).json(donationRequest);
      }
    } catch (error) {
      res.status(500).send(err.message);
    }
  });
  
  FundraiserRouter.patch('/fund/:id',async(req,res)=>{
    const {id} = req.params;
    try{
      const user = await UserModel.findById(req.body.userID);
      const fund= await FundraiserModel.findById(id);
      if(fund.userID!==req.body.userID){
          const funding = await FundraiserModel.findByIdAndUpdate(id,
              {
                  $inc:{raised:req.body.raised},
                  $push:{funders:req.body.userID}
              },{new:true});
          await funding.save();
          res.status(200).send("Funded");
      }else{
          res.status(400).send("Fundraiser owner can't add funds their own fundraiser")
      }
    }catch(err){
        res.status(400).send(err.message)
    }
  })

  FundraiserRouter.patch("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const fund= await FundraiserModel.findbyID(id);
        if(fund.userID === req.body.userID){
      const donationRequest = await FundraiserModel.findByIdAndUpdate(
        id,
        req.body
      );
      res.status(200).json("Donation Request updated successfully");
        }
        else{
            res.status(400).send("unauthorized")
        }
    } catch (error) {
      res.status(500).send(err.message);
    }
  });
  
  FundraiserRouter.delete("/delete/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
      const isuser = await FundraiserModel.findById(id);
      if (isuser.userID !== req.body.userID) {
        res.status(401).json({ message: "Not Authorized" });
      } else {
        const donationRequest = await FundraiserModel.findByIdAndDelete(id);
        res.status(200).json("Donation Request updated successfully");
      }
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = FundraiserRouter;