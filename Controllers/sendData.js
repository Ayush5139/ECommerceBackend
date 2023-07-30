
const { default: mongoose } = require("mongoose");
const {cartModel, productDataModel, productModel, signupModel} = require("../Data/producuts");

function sendData(req, res) {
    res.send(products)
}

async function getDataByCat(req, res) {
    const cat = req.params.category
    console.log(cat)
    const response = await productModel.find({ category: cat })
    res.send(response)
}

async function getData(req, res) {
    const response = await productModel.find()
    res.send(response)
}

async function featuredData(req, res) {
    const response = await productModel.find().sort({ "rating.rate": -1 })
    res.send(response)
}

async function addToCart(req, res) {
    const data1 = req.body;
    console.log(data1)
    const id = data1.id
    console.log(id)
    const count = data1.finalCount
    console.log(count)
    const response = await productModel.find({_id:id})
    console.log(response)
    const responseCart = await cartModel.find({_id:id})
    console.log(responseCart.countInCart);
    if(responseCart.length>0){
        const response1 = await cartModel.findByIdAndUpdate({_id:id},{$set:{countInCart:count}})
        const response2 = await cartModel.find()
        res.send(response2)
    }
    else{
        await cartModel.insertMany(response)
        const response1 = await cartModel.findByIdAndUpdate({_id:id},{$set:{countInCart:count}})
        const response2 = await cartModel.find()
        res.send(response2)
    }
}

async function cartData(req,res){
    const response = await cartModel.find()
    res.send(response)
}

async function otherCartData(req,res){
    const response = await cartModel.find()
    const arr = []
    const count = response.length
    console.log("length of cart",count)
    let sum = 0
    for (let i = 0; i < count; i++) {
        sum = sum + (response[i].price * response[i].countInCart)
    }
    await arr.push(count)
    await arr.push(sum)
    res.send(arr)
}

async function deleteFromCart(req,res){
    const data = req.body
    console.log(data.finalValue)
    const response = await cartModel.findByIdAndDelete({_id:data.finalValue})
}

async function filteredData(req,res){
    const cat = req.params.cat
    const filteredData = await productModel.find({category:cat})
    res.send(filteredData)
}

async function filteredItem(req,res){
    const pname = req.params.pname
    console.log(pname)
    const filteredData = await productModel.find({title:pname})
    console.log(filteredData)
    res.send(filteredData)
}

async function updateCart(req,res){
    const namerp = req.params.namep
    console.log("updateed",namerp)
    const response = await cartModel.find({title:namerp})
    const response1 = await productModel.find({title:namerp})
    if(response.length>0){
        res.send(response)
    }
    else{
        res.send(response1)
    }
}

async function updateOID(req,res){
    // console.log(req.body.data.id)
    // console.log(req.body.data.userID)
    // console.log(await cartModel.find({_id:req.body.data.id , UserID:req.body.data.userID}))
    const response = await productModel.find({_id:req.body.data.id})
    console.log(response)
    const responseCart = await cartModel.find({_id:req.body.data.id,UserID:req.body.data.userID})
    console.log(responseCart)
    if(responseCart.length>0){
        try{const response1 = await cartModel.findByIdAndUpdate({_id:req.body.data.id},{$set:{countInCart:req.body.data.finalCount}})
        const response2 = await cartModel.find()
        res.send(response2)}
        catch(err){
            console.log(err)
        }
    }
    else{
        try
        {await cartModel.insertMany(response)
            console.log("UserID",req.body.data.userID)
        const response1 = await cartModel.findByIdAndUpdate({_id:req.body.data.id},{$set:{UserID:req.body.data.userID,countInCart:req.body.data.finalCount}})
        const response2 = await cartModel.find()
        res.send(response2)}
        catch(err){
            console.log(err)
        }
    }
}

async function findUser(req,res){
    const userid = req.params
    console.log(userid.userId)
    try{const response = await signupModel.find({_id:userid.userId})
    res.send(response)}
    catch(err){
        console.log(err)
    }
}

async function deleteAll(req,res){
    const userrrid = req.params.userrid
    console.log(userrrid)
    await cartModel.deleteMany({})
    const response = await cartModel.find()
    console.log("deleted",response)
}


module.exports = { sendData, getData, getDataByCat, featuredData, addToCart,cartData,otherCartData,deleteFromCart,filteredData,filteredItem,updateCart,updateOID,findUser,deleteAll}