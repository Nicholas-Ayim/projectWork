const router = require('express').Router()

const HostelManager = require("../hostelManagerComponent/hostel")

router.get("/manager/data",async(req,res)=>{
  HostelManager.find()
  .then((data)=>res.json(data))
})

router.post('/signup/manager',async(req,res)=>{
    try{
        const {name,hostelManaged,contact,hostelRegistrationNumber,picture,password} = await req.body
        // if(!hostelRegistrationNumber){
        //     msg = 'please provide hostel registration number'
        //     res.status(400).json(msg)
        // }
        HostelManager.create({
            name,
            hostelManaged,
            contact,
            hostelRegistrationNumber,
            picture,
            password
        })
        .then((newManager)=> res.json(newManager))
        .catch(error=>res.status(400).json('new manager NOT added'+error))
    }
    catch(err){
        let msg;
            msg="user already exist"
            if(err.code === 11000){
                res.status(400).json(msg)
            }
    }
})


router.post("/login/manager", async (req, res) => {
    try {
      const { contact, password } = req.body;
  
      //find the user by the credentials
      const manager = await HostelManager.findByCredentials(contact, password);
      manager.status = "online";
      await manager.save();
      res.status(200).json(manager);
    } catch (error) {
      res.status(400).json("user not found" + error);
    }
  });

  router.delete("/delete/:id",(req,res)=>{
    HostelManager.findById(req.params.id)
    .then((user)=>
    {
      if(!user){
        res.status(400).json("user not found")
      }
      user.deleteOne()
      .then(()=>res.json('user deleted'+user))
      .catch(err=>res.status(400).json('user not deleted'+err))
    }
    )
    .catch(()=>res.status(500).json("internal error"))
  })
module.exports = router