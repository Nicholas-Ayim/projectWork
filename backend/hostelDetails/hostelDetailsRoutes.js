const router = require('express').Router()
const HostelInfo = require("./hostelDetails")
const Hostel = require("../hostelManagerComponent/hostel")
router.post("/managerinfo/:id",async(req,res)=>{
    try{
      const {hostelName,totalRooms,totalFloors,roomsPictures} = req.body
      const newHostelInfo = new HostelInfo({
        hostelName,
        totalRooms,
        totalFloors,
        roomsPictures
      })
     await newHostelInfo.save()


      //finding the hostel hostelDetails and updating
     const hostelUpdtated = await Hostel.findOneAndUpdate(
      {_id: (req.params.id)},
        {$set: {hostelDetails: newHostelInfo}},
        {new: true}
      )

      if(!hostelUpdtated){
        res.status(404).json({error: 'Hostel not found'})
      }

      res.status(201).json(newHostelInfo)



    }catch(error){
       let msg;
       if(error){
         msg = "external or internal error"
        res.status(500).json(msg)
       }else{
        msg = "fail to update"
        res.status(400).json(msg)
       }
    }
})
module.exports = router