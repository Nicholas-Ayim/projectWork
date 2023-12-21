const express= require('express')

const app = express()
const http = require('http')
const cors = require("cors")
const server = http.createServer(app)
const PORT = 5000
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const { Server} = require("socket.io")

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    socket.on('newCount',data=>{
        // console.log("the data",data)
    })
})
//database connection
const mongoose = require("mongoose")
const uri = "mongodb://127.0.0.1:27017/Chat"
const connection = mongoose.connection
connection.once("open",()=>{
    console.log('connected to database')
})

mongoose.connect(uri,{
    // newParserUrl:true,
    // unifiedTopology:true,
})

const contactRoutes = require('./contactRoutes/contactRoutes')
app.use('/contact',contactRoutes)

const hostelRoutes = require("./hostelManagerComponent/hostelRoutes")
app.use('/contact',hostelRoutes)

const hostelDetailsRoutes = require("./hostelDetails/hostelDetailsRoutes")
app.use('/contact',hostelDetailsRoutes)
server.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
})