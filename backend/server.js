const express= require('express')
require('dotenv').config({ path: 'connect.env' });
// ... rest of your code
// const cookie = require('cookie-parser')
const Manager = require("./hostelManagerComponent/hostel")
const Student = require("./contact")
const HostelInfo = require("./hostelDetails/hostelDetails")

const app = express()
const http = require('http')
const cors = require("cors")
const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use(cookie())



const { Server} = require("socket.io")

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

  io.on("connection", (socket) => {
});

//database connection
const mongoose = require("mongoose")
const connection = mongoose.connection
connection.once("open",()=>{
    console.log('connected to database')
})
const uri = "mongodb://127.0.0.1:27017/Chat" && process.env.DB_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const contactRoutes = require('./contactRoutes/contactRoutes')
app.use('/contact',contactRoutes)

const hostelRoutes = require("./hostelManagerComponent/hostelRoutes")
app.use('/contact',hostelRoutes)

const hostelDetailsRoutes = require("./hostelDetails/hostelDetailsRoutes")
app.use('/contact',hostelDetailsRoutes)
server.listen(process.env.PORT,()=>{
    console.log(`listening to port ${process.env.PORT}`)
})