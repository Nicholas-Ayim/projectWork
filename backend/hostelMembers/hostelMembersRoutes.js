const router = require('express').Router()
const HostelMembers = require('./hostelMembers')

router.get('/allMembers',async(req,res)=>{
    HostelMembers.find()
    .then((members)=>res.json(members))
    .catch(error=>res.status(404).json('no members'+error))
})

module.exports = router