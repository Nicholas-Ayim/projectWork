const router = require('express').Router()
const Contacts = require('../contact')
router.post('/signup/student',async (req,res)=>{
     try{
       let { name, picture,index,email,contact,password } = await req.body
       
       if(!contact){
          return console.log('user contact not provided')
       }
        if(contact.length > 10){
          return res.json("user contact greater than 10")
        }
         const newContact = await Contacts.create({
          name,
          picture,
          index,
          email,
          contact,
          password
      })

   res.status(201).json(newContact);
   console.log('save successfully')
        
    } catch (error) {
      //creating a simple message to alert user when error appears
      let msg;
      if (error.code == 11000) {
        msg = "user already exist";
      } else {
        msg = error.message;
      }
      console.log(error);
      res.status(400).json(msg);
    }
  });

  router.post("/login/student", async (req, res) => {
    try {
      const { contact, password } = req.body;
  
      //find the user by the credentials
      const user = await Contacts.findByCredentials(contact, password);
      user.status = "online";
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json("user not found" + error);
    }
  });

  router.delete('/logout/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const userFound = await Contacts.findById(id);
  
      if (userFound) {
        userFound.status = "offline";
        await userFound.save();
        console.log(userFound.status)
        res.status(200).json({ message: "Logout successful" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error('Failed to logout', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.delete("/delete/student/:id",(req,res)=>{
    Contacts.findById(req.params.id)
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
  router.get("/data/student",(req,res)=>{
    Contacts.find()
    .then((contacts)=>res.json(contacts))
    .catch(error=>res.status(400).json("error in  fetching data",error))
  })


module.exports = router