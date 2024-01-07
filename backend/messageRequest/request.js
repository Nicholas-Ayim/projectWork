const mongoose = require('mongoose')

const MessengerRequestSchema = new mongoose.Schema({
    to: String,
    content: String,
    messenger: String,
    timeSent: String,
    dateSent:String,
    messengerPic: String
})

const MessengerRequest = mongoose.model('MessengerRequest', MessengerRequestSchema)

module.exports = MessengerRequest
