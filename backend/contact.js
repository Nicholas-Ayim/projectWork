const mongoose = require('mongoose')
const { isEmail } = require("validator")
const bcrypt = require('bcrypt')
const Contact = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"cannot be blank"]
    },
    contact :{
        type:String,
        unique: true,
        primary: true,
        required:[true,"cannot be blank"],
        // validate:[isContact,"invalid contact"]
    },
    picture:{
        type:String,
        required:[true,"no picture added"]
    },
    email:{
        type:String,
        unique:true,
        primary:true,
        required:[true,"cannot be blank"],
        validate:[isEmail,"invalid email"]

    },
    password:{
        type:String,
        required:[true,"cannot be blank"]
    },
    newMessage :{
        type:Object,
        default:{}
    },
    index:{
        type:String,
        required:[true,"user index: dept-name/programme/year/index-no"],
        unique:true,
        primary:true
    },
    manager:{
        type:Object,
        default:{}
    },
    newGroup:{
        type:Object,
        default: {}
    },
    status: {
        type:String,
        default:"offline"
    }
},
{ minimize: false }
)

Contact.pre("save",function(next){
    const contacts = this
    if(!contacts.isModified("password")){
        return next()
    }else{
        bcrypt.genSalt(10,function(error,salt){
            if(error){
                return error
            }else{
                bcrypt.hash(contacts.password,salt,function(error,hash){
                    if(error){
                        return next(error)
                    }else{
                        contacts.password = hash
                        return next()
                    }
                })
            }
        })
    }
})
Contact.methods.toJSON = function(){
    const contact = this 
    const contactObject  = contact.toObject()
    delete contactObject.password
    return contactObject
}

Contact.statics.findByCredentials = async function (contact, password) {
    const contacts = this
  const user = await contacts.findOne({ contact });
  //if  no user found
  if (!user) {
    throw new Error("invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("invalid email or password");
  } else {
    return user;
  }
};
const Contacts = mongoose.model('Contact',Contact)

module.exports = Contacts