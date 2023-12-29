const router = require('express').Router()
const MessengerRequest = require('./request')

router.get('/joinRequest',async(req,res)=>{
    await MessengerRequest.find()
    .then((requests)=>res.json(requests))
    .catch(error=>res.status(404).json('no request found',error))
})


module.exports = router