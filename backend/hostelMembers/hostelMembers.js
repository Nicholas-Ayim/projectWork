const mongoose = require('mongoose')

const HostelMembers = new mongoose.Schema({
    hostelName:{
        type:String,
        unique:true,
        required:[true,"can not be blank"]
    },
    studentId:{
        type:String,
        unique:true,
        required:[true,"can not be empty"]
    },
    dateJoined:{
        type:String,
    }
})


const hostelMembers = mongoose.model('HostelMembers',HostelMembers)

module.exports = hostelMembers