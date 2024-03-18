const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter name']
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        
    }
});


userSchema.methods.getJwtToken = function(){
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    return jwt.sign({id: this.id}, process.env.SECRET, {   
         expiresIn: Date.now(exp) 
     })
 }


const E_User = mongoose.model("E_User", userSchema);

module.exports = E_User;