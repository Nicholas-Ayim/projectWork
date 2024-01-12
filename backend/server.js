const express= require('express')
require('dotenv').config({ path: 'connect.env' });
// ... rest of your code
// const cookie = require('cookie-parser')
const Manager = require("./hostelManagerComponent/hostel")
const Student = require("./contact")
const HostelInfo = require("./hostelDetails/hostelDetails")
const MessengerRequest = require("./messageRequest/request")
const hostelMembers = require('./hostelMembers/hostelMembers')
const app = express()
const http = require('http')
const cors = require("cors")

const format = require('date-fns/format')
const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use(cookie())

const contactRoutes = require('./contactRoutes/contactRoutes')
app.use('/contact',contactRoutes)

const hostelRoutes = require("./hostelManagerComponent/hostelRoutes")
app.use('/contact',hostelRoutes)

const hostelDetailsRoutes = require("./hostelDetails/hostelDetailsRoutes")
app.use('/contact',hostelDetailsRoutes)

const RequestRoutes = require("./messageRequest/requestRoute")
app.use('/contact',RequestRoutes)


const hostelMembersRoutes = require("./hostelMembers/hostelMembersRoutes")
app.use('/contact',hostelMembersRoutes)

const { Server} = require("socket.io")

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

     

  io.on("connection", (socket) => {

    socket.on('join-request',async (hostelSelected,hostels,currentStudent)=>{
        //   console.log('hostels',hostels)
        //   console.log('selected hostel',hostelSelected)
          const {name,contact,picture,email} = currentStudent
          const {hostelName} = hostelSelected
           
          const currentDate = new Date()
          const dateReceived = format(currentDate, "MMM-do-yyyy");
           const timeReceived = format(new Date(),"HH-mm-ss")
           socket.emit('requestTime',timeReceived)
         const managerRequest = await MessengerRequest.create({
            to:hostelName,
            messenger:`${name}`,
            content:`incoming message from ${name} to ${hostelName} Hostel `,
            messengerPic: picture,
            dateSent:dateReceived,
            timeSent:timeReceived
        })
        managerRequest.save()
        console.log('new request',managerRequest)

    })
    socket.on('accept-request',messenger=>{
        console.log("the message request",messenger)
        const {_id,to,dateSent,timeSent,messengerPic,messenger} = messenger
        const newHostelMember = hostelMembers.create({
            hostelName:to,
            studentId:_id,
            dateJoined:dateSent,
        })
        newHostelMember.save()
    })
});

//database connection
const mongoose = require("mongoose")
const connection = mongoose.connection
connection.once("open",()=>{
    console.log('connected to database')
})
// const uri = "mongodb://127.0.0.1:27017/Chat" || process.env.DB_URI
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



server.listen(process.env.PORT,()=>{    
    console.log(`listening to port ${process.env.PORT}`)
})