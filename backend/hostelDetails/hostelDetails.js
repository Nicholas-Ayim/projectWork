const mongoose = require("mongoose")

const HostelDetails = new mongoose.Schema({
    hostelName:String,
    totalRooms:String,
    totalFloors:String,
    roomsPictures:[]
})

const HostelInfo = mongoose.model("HostelDetails",HostelDetails)
module.exports = HostelInfo