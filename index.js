const express = require("express")
const { route } = require("./Routes/route")
const app = express()
const cors = require("cors")
const { connect } = require("mongoose")
const { connectDB, addData } = require("./Data/producuts")

app.use(express.json())
app.use(cors())
app.use("/",route)



app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(9000,()=>{
    connectDB()
    console.log("on 9000")
})