const express = require("express")
const { signupModel } = require("../Data/producuts")
const app = express()
const bcrpyt = require("bcrypt")
const saltrounds = 10
const secretkey = "ecommercesecret"
const jwt = require("jsonwebtoken")


async function signUp(req,res){
    const signUpData = req.body
    console.log(signUpData)
    const hashedpass = bcrpyt.hashSync(signUpData.data.password,saltrounds)
    console.log(hashedpass)
    const response = await signupModel.find()
    console.log(response)
    const newObj={
        email:signUpData.data.email,
        password:hashedpass
    }
    const matched = await signupModel.find({email:signUpData.data.email})
    if (matched.length>0){
        console.log("0")
        res.send({message:"Email Already Exists"})
    }
    else{
        await signupModel.create(newObj)
        console.log("1")
        res.send({message:"User Registered"})
    }
}

async function logIn(req,res){
    const loginData = req.body
    console.log(req.body)
    const response = await signupModel.find({email:loginData.data.email})
    console.log(response)
    const validate = bcrpyt.compareSync(loginData.data.password,response[0].password)
    console.log(validate)
    if (validate==true){
        const token = jwt.sign(loginData,secretkey)
        let resp1 = {
            "msg": "User has logged in successfully",
            "token": token,
            "userID":response[0]._id //6492b71d41deda9f89a4c740
        }
        res.send(resp1)
    }
    else{
        res.send("invalid password")
    }
}

module.exports={signUp,logIn}

