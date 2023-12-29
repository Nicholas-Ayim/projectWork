const express= require('express')
require('dotenv').config({ path: 'connect.env' });
// ... rest of your code
// const cookie = require('cookie-parser')
const Manager = require("./hostelManagerComponent/hostel")
const Student = require("./contact")
const HostelInfo = require("./hostelDetails/hostelDetails")
const MessengerRequest = require("./messageRequest/request")

const app = express()
const http = require('http')
const cors = require("cors")
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

const { Server} = require("socket.io")

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

// async function toSpecificHostel(hostelName){
//     let messageId = await MessengerRequest.aggregate([
//         { $match: { to: hostelName } },
//         { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
//     ])
//     return messageId
// }

// let hostelsAvaliable = []

  io.on("connection", (socket) => {

    socket.on('join-request',async (hostelSelected,hostels,currentStudent)=>{
        //   console.log('hostels',hostels)
        //   console.log('selected hostel',hostelSelected)
          const {name,contact,picture,email} = currentStudent
          const {hostelName} = hostelSelected

          const managerRequest = await MessengerRequest.create({
            to:hostelName,
            messenger:`${name}`,
            content:`incoming message from ${name} to ${hostelName} Hostel `,
            messengerPic: picture,
            timeSent:'now'
        })
        managerRequest.save()
        console.log('new request',managerRequest)
          //creating rooms for message request
        //   hostels.map(async(data,index)=>{
        //       hostelsAvaliable.push(data.hostelManaged)

        //       if(hostelName === data.hostelManaged){
        //         socket.join(hostelName)
        //         console.log(`incoming message from ${name} to ${hostelName} Hostel `)
        //         let messageRoom =  await toSpecificHostel(hostelName)
                 
            
        //         io.to(hostelName).emit('join-request',messageRoom)
        //       }
        //   }
        //   )
        //   console.log('all hostels',hostelsAvaliable)

    })
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



server.listen(process.env.PORT,()=>{
    console.log(`listening to port ${process.env.PORT}`)
})