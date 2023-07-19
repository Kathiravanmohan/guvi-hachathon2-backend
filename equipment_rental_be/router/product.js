const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {dbUrl} = require('../dbconfig')
const {UserModel,AddProduct} = require('../schema/UserSchema')
const {createToken,validate,adminGaurd, hashPassword, comparePassword} = require('../auth')

mongoose.connect(dbUrl)


router.get('/all',async (req,res)=>{
    try {
        let product = await AddProduct.find()
        res
        .status(200)
        .send({
            message:"Data Fetch Successfull",
            product
        })
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .send({
                message:"Internal Server Error"
            })
    }
})

router.post('/addproduct',validate,adminGaurd,async (req,res)=>{
    try {
        let product = await AddProduct.findOne({name:req.body.name})
        if(!product)
        {
            
            let newUser = await AddProduct.create(req.body)
            res.status(200).send({message:"User Created Successfully"})
        }
        else
        {
            res.status(400).send({message:`User with ${req.body.name} already exists`})
        }

    } catch (error) {
        res
        .status(500)
        .send({
                message:"Internal Server Error",
                error: error?.message
            })
    }
})


module.exports = router