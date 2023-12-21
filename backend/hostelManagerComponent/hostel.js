const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const HostelManager = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"cannot be blank"]
    },
    hostelManaged:{
        type:String,
        unique:true,
        primmary:true,
        required:[true,"cannot be blank"]
    },
    picture:{
        type:String,
        required:[true,"cannot be blank"]
    },
    contact:{
        type:String,
        unique:true,
        primmary:true,
        required:[true,"cannot be blank"]
    },
    hostelRegistrationNumber:{
        type:Number,
        unique:true,
        primmary:true,
        required:[true,"cannot be blank"]
    },
    hostelLocation:{
        type:Object,
        default:{}
    },
    password:{
        type:String,
        required:[true, "cannot be blank"]
    },
    hostelDetails:{
        type:Object,
        default:{}
    },
    status:{
        type:String,
        default:"offline"
    }
},
{minimize:false}
)


HostelManager.pre("save",function(next){
    const manager = this
    if(!manager.isModified("password")){
        return next()
    }else{
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                return next()
            }else{
                bcrypt.hash(manager.password,salt,(err,hash)=>{
                    if(err){
                        return next(err)
                    }else{
                        manager.password = hash
                        return next()
                    }
                })
            }
        })
    }
})


//deleting password fron json response 
HostelManager.methods.toJSON = function(){
    const manager = this
    const ObjectData = manager.toObject()
    delete ObjectData.password
    return ObjectData
}

//comparing details fro loging 

HostelManager.statics.findByCredentials = async function(contact,password){
    const managers = this
    const managerFound = await managers.findOne({ contact  })
    if(!managerFound){
        throw new Error("mismatch detials")
    }

    const passwordMatch = await bcrypt.compare(password, managerFound.password)

    if(!passwordMatch){
        throw new Error('password does not match')
    }else{
        return managerFound
    }
}


const Hostel = mongoose.model("HostelManager",HostelManager)


module.exports = Hostel