const { getData, getDataByCat, featuredData, addToCart, cartData, otherCartData, deleteFromCart, filteredData, filteredItem, dataFront, updateCart, updateOID } = require("../Controllers/sendData")
const { signUp, logIn } = require("../Controllers/user")

const route = require("express").Router()

route.get("/data",getData)
route.get ("/data/by/:category",getDataByCat)
route.get("/featured",featuredData)
route.post("/addToCart",addToCart)
route.get("/cartData",cartData)
route.get("/otherCartData",otherCartData)
route.post("/deleteItem",deleteFromCart)
route.get("/filteredData/:cat",filteredData)
route.get("/filter/:pname",filteredItem)
route.get("/update/data/:namep",updateCart)
route.post("/signup",signUp)
route.post("/login",logIn)
route.post("/updateOID",updateOID)


module.exports = {route}

